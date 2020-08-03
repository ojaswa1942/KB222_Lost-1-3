import path from 'path';
import { Storage, GetSignedUrlConfig } from '@google-cloud/storage';
import ms from 'ms';
import config from '../config';

const storage = new Storage();

const genSignedUrl = async (
  filename: string,
  action: GetSignedUrlConfig['action'],
  saveAsName?: string
): Promise<string> => {
  const { bucket, signedExpiry, prefix } = config.storage;
  const options: GetSignedUrlConfig = {
    version: 'v4',
    expires: Date.now() + ms(signedExpiry),
    action,
    promptSaveAs: saveAsName,
  };

  const key = path.join(prefix, filename);

  const [url] = await storage.bucket(bucket).file(key).getSignedUrl(options);

  return url;
};

export const genWriteSignedUrl = (key: string): Promise<string> => {
  return genSignedUrl(key, 'write');
};

export const genReadSignedUrl = (key: string, name?: string): Promise<string> => {
  return genSignedUrl(key, 'read', name);
};

export const getPublicURL = (filename: string): string => {
  const { bucket, prefix } = config.storage;
  const url = `${storage.apiEndpoint}/${path.join(bucket, prefix, filename)}`;
  return url;
};

// Makes an object public and returns it's public URL
export const makePublic = async (filename: string): Promise<string> => {
  const { bucket, prefix } = config.storage;
  const key = path.join(prefix, filename);

  await storage.bucket(bucket).file(key).makePublic();

  return getPublicURL(filename);
};

export const deleteFile = async (filename: string): Promise<void> => {
  const { bucket, prefix } = config.storage;
  const key = path.join(prefix, filename);

  await storage.bucket(bucket).file(key).delete();
};

export const moveFile = async (from: string, to: string): Promise<void> => {
  const { prefix, bucket } = config.storage;
  const fromKey = path.join(prefix, from);
  const toKey = path.join(prefix, to);

  await storage.bucket(bucket).file(fromKey).move(toKey);
};
