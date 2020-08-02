/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-console */
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import GET_SIGNED_URL from '../graphql/mutations/upload';
const useFileUpload = () => {
  const [state, changeState] = useState('initialized');
  const [keys, changeKeys] = useState([]);
  const [getUrl] = useMutation(GET_SIGNED_URL);
  const tmpKey = [];
  const uploadSingleFile = (file, index) => {
    return new Promise((resolve, reject) => {
      getUrl({ variables: { name: file.name } }).then((response) => {
        if (response?.data?.upload?.code === '200') {
          tmpKey[index] = { key: response?.data?.upload?.file?.key, name: file.name };
          changeKeys(tmpKey);
          fetch(response?.data?.upload?.url, {
            method: 'PUT',
            headers: {
              'Content-Type': file.type || 'application/octet-stream',
            },
            body: file,
          })
            .then((fetchResponse) => {
              if (fetchResponse.status === 200) {
                resolve('success');
              } else {
                reject('failed');
              }
            })
            .catch((err) => {
              console.log(err);
              reject('failed');
            });
        }
      });
    });
  };
  const returningObj = {
    status: state,
    keys,
    uploadFiles: (files) => {
      return new Promise((resolve, reject) => {
        changeState('uploading');
        const filesPromiseArray = files.map((file, index) => {
          return uploadSingleFile(file, index);
        });
        Promise.all(filesPromiseArray)
          .then((response) => {
            if (response.every((ele) => ele === 'success')) {
              changeState('success');
              const responseArray = tmpKey.map((key) => {
                return { ...key, status: 'success' };
              });
              resolve(responseArray);
            } else {
              changeState('failed');
              const responseArray = tmpKey.map((key) => {
                return { ...key, status: 'failed' };
              });
              reject(responseArray);
            }
          })
          .catch(() => {
            changeState('failed');
            const responseArray = tmpKey.map((key) => {
              return { ...key, status: 'failed' };
            });
            reject(responseArray);
          });
      });
    },
  };
  return returningObj;
};
export default useFileUpload;