import environment from '../environment/environment.js';
import * as CryptoJS from 'crypto-js';


export function generateHash(publicKey, privateKey, timeStamp) {

    let input = `${timeStamp}${privateKey.trim()}${publicKey.trim()}`;

    return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
}


export function buildRequestParameters(timeStamp, hash, apikey) {
    return `?ts=${timeStamp}&apikey=${apikey}&hash=${hash}`
}

export function buildApiEndpoint() {
    const { protocol, baseUrl } = environment();
    const parameters = buildAuthenticationParameters();
    const apiPath = 'v1/public/characters';

    return protocol + baseUrl + 'v1/public/characters' + parameters;
}

export function buildThumbnailPath(thumbnailPath, thumbnailExtention) {
    
    const parameters = buildAuthenticationParameters();
    const thumbnailUrl = thumbnailPath +"."+ thumbnailExtention + parameters;
    return thumbnailUrl;
}

export const buildAuthenticationParameters = () => {
    const { publicKey, privateKey } = environment();
    let timeStamp = new Date().getTime();
    const hash = generateHash(publicKey, privateKey, timeStamp);

    return buildRequestParameters(timeStamp, hash, publicKey);
}

