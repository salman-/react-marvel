import environment from '../environment/environment.js';
import * as CryptoJS from 'crypto-js';



export function doesNotContainSubstring(mainString, substring) {
    return mainString.indexOf(substring) === -1;
}

export function generateHash() {
    let { publicKey, privateKey } = environment();
    const timestampInMilliseconds = new Date().getTime();

    let input = `${timestampInMilliseconds}${privateKey.trim()}${publicKey.trim()}`;

    return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
}


export function buildRequestParameters(timeStamp, hash, apikey) {
    return `ts=${timeStamp}&apikey=${apikey}&hash=${hash}`
}

export function buildApiEndpoint() {
    const { protocol, baseUrl, publicKey } = environment();
    
    let timeStamp = new Date().getTime();
    const hash = generateHash();

    const parameters = buildRequestParameters(timeStamp, hash, publicKey);
    const apiPath = 'v1/public/characters?';

    return protocol + baseUrl + 'v1/public/characters?' + parameters;
    //`${protocol}${baseUrl}${apiPath}${parameters}`;
}

export function randomlySelectMarvels(marvelWithThumbnail) {
    let randomlySelectedMarvel = [];
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * marvelWithThumbnail.length);
        randomlySelectedMarvel.push(marvelWithThumbnail[index]);
    }
    return randomlySelectedMarvel;
}

export function filterMarvelsWithoutThumbnail(responseData) {
    let marvelWithThumbnail = [];
    for (let i = 0; i < 100; i++) {
        let name = responseData['data']['results'][i]['name'];
        let thumbnailOfMarvel = responseData['data']['results'][i]['thumbnail']['path'];
        let validMarvel = doesNotContainSubstring(thumbnailOfMarvel, "image_not_available");
        if (validMarvel) {
            marvelWithThumbnail.push(new Marvel(name, thumbnailOfMarvel + "/portrait_xlarge.jpg"));
        }
    }
    return marvelWithThumbnail;
}