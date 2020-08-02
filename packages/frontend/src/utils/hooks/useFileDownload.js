/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */
import { useMutation } from '@apollo/client';
import GET_URL from '../graphql/mutations/download';
import getToast from '../getToast';

const useFileDownload = () => {
  const [fetchUrl] = useMutation(GET_URL);
  const getAllIndexes = (arr, val) => {
    const indexes = [];
    for (let i = 0; i < arr.length; i += 1) if (arr[i] === val) indexes.push(i);
    return indexes;
  };
  const downloadSingleFile = (keyEle) => {
    return new Promise((resolve, reject) => {
      const { name, ...urlVaribale } = keyEle;
      fetchUrl({ variables: urlVaribale }).then((response) => {
        if (response?.data?.download?.code === '200') {
          const link = document.createElement('a');
          link.href = response?.data?.download?.url;
          link.setAttribute('download', response?.data?.download?.file?.name);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          resolve('success');
          //   fetch(response?.data?.download?.url).then((res) => {
          //     console.log(res);
          //     if (res?.status === 200) {
          //     } else {
          //       reject('failed');
          //     }
          //   });
        } else {
          reject('failed');
        }
      });
    });
  };
  const returningObj = {
    downloadFiles: (keyArray) => {
      return new Promise((resolve, reject) => {
        const resArray = keyArray.map((keyEle) => {
          return downloadSingleFile(keyEle);
        });
        
        const Toast = getToast();
        Promise.allSettled(resArray)
          .then((response) => {
            if (response.every((ele) => ele.value === 'success')) {
              Toast.fire({
                icon: 'success',
                title: 'Downloading file',
              });
              resolve(response);
            } else {
              const indexes = getAllIndexes(response, 'failed');
              indexes.forEach((index) => {
                Toast.fire({
                  icon: 'error',
                  title: `failed to download file ${keyArray[index].name}. Please try to download it individually.`,
                });
              });
            }
            resolve(response);
          })
          .catch((err) => {
            console.log(err);
            Toast.fire({
              icon: 'error',
              title: 'Oops! Something went wrong. Please try downloading again.',
            });
            reject(err);
          });
      });
    },
  };
  return returningObj;
};
export default useFileDownload;