import environment from '../environment/environment.js';
import * as CryptoJS from 'crypto-js';


export const buildThumbnailPath = (thumbnailPath, thumbnailExtention) => {
    const parameters = buildAuthenticationParameters();
    return thumbnailPath +"."+ thumbnailExtention + parameters;
}

export const buildApiEndpoint = (path) => {
    const { protocol, baseUrl } = environment();
    const parameters = buildAuthenticationParameters();
    return protocol + baseUrl + path + parameters;
}

export const buildAuthenticationParameters = () => {
    const { publicKey, privateKey } = environment();
    let timeStamp = new Date().getTime();
    const hash = generateHash(publicKey, privateKey, timeStamp);

    return buildRequestParameters(timeStamp, hash, publicKey);
}

export const generateHash = (publicKey, privateKey, timeStamp)=> {
    let input = `${timeStamp}${privateKey.trim()}${publicKey.trim()}`;
    return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
}


export const buildRequestParameters = (timeStamp, hash, apikey)=> {
    return `?ts=${timeStamp}&apikey=${apikey}&hash=${hash}`
}







