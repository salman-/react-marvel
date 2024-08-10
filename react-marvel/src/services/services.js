import environment from '../environment/environment.js';
import * as CryptoJS from 'crypto-js';



export function doesNotContainSubstring(mainString, substring) {
    return mainString.indexOf(substring) === -1;
}

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
    //`${protocol}${baseUrl}${apiPath}${parameters}`;
}

export const buildAuthenticationParameters = () => {
    const { publicKey, privateKey } = environment();
    let timeStamp = new Date().getTime();
    const hash = generateHash(publicKey, privateKey, timeStamp);

    return buildRequestParameters(timeStamp, hash, publicKey);
}

export function randomlySelectMarvels(marvelWithThumbnail) {
    let randomlySelectedMarvel = [];
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * marvelWithThumbnail.length);
        randomlySelectedMarvel.push(marvelWithThumbnail[index]);
    }
    return randomlySelectedMarvel;
}

export function filterMarvelsWithoutThumbnail(characters) {
    let marvelWithThumbnail = [];
    const limit = Math.min(characters.length, 100);
    for (let i = 0; i < limit; i++) {
        let name = characters[i].name;
        let thumbnailOfMarvel = characters[i].thumbnail.path;
        let validMarvel = doesNotContainSubstring(thumbnailOfMarvel, "image_not_available");
        if (validMarvel) {

            const marvel = {
                id: characters[i].id,
                thumbnail: characters[i].thumbnail.path,
                thumbnailExtention: characters[i].thumbnail.extension,
                description: characters[i].description,
                name: characters[i].name
            };
            marvelWithThumbnail.push(marvel);
        }
    }
    return marvelWithThumbnail;
}