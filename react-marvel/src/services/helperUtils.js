import environment from '../environment/environment.js';
import * as CryptoJS from 'crypto-js';

export const buildThumbnailPath = (thumbnailPath, thumbnailExtension) => {
  const parameters = buildAuthenticationParameters();
  return thumbnailPath + "." + thumbnailExtension + parameters;
}

export const buildApiEndpoint = (path) => {
  const {protocol, baseUrl} = environment();
  const parameters = buildAuthenticationParameters();
  return protocol + baseUrl + path + parameters;
}

export const buildAuthenticationParameters = () => {
  const {publicKey, privateKey} = environment();
  let timeStamp = new Date().getTime();
  const hash = generateHash(publicKey, privateKey, timeStamp);

  return buildAuthenticationRequestParameters(timeStamp, hash, publicKey);
}

export const generateHash = (publicKey, privateKey, timeStamp) => {
  let input = `${timeStamp}${privateKey.trim()}${publicKey.trim()}`;
  return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
}

export const buildAuthenticationRequestParameters = (timeStamp, hash,
    apikey) => {
  return `?ts=${timeStamp}&apikey=${apikey}&hash=${hash}`
}







