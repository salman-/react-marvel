import { doesNotContainSubstring, generateHash, buildRequestParameters, buildApiEndpoint } from './services.js';
import environment from '../environment/environment.js';


describe('Check helper services', () => {
    jest.setTimeout(70000);

    it('Check if a string does not contain a given sub-string', () => {
        const text = "This is a random String";
        let subString = "random";

        expect(doesNotContainSubstring(text, subString)).toBe(false);
        subString = "not existing substring";
        expect(doesNotContainSubstring(text, subString)).toBe(true);

    });

    it('generated Hash cannot be null', () => {
        const { publicKey } = environment();
        let timeStamp = 1723293215578;
        const privateKey = 'private_key_string';

        const hash = generateHash(publicKey, privateKey, timeStamp);
        expect(hash).toBe('7018596388424e3848221f7059c59f7b')
    });

    it('builds the request parameters correctly', () => {
        const publicKey = 'random_key';
        const hash = 'random_string';
        const timeStamp = new Date().getTime();
        const parametersString = buildRequestParameters(timeStamp, hash, publicKey);
        const expectedString = `ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
        expect(parametersString).toBe(expectedString);
    });

    it('creates correct Endpoint to get Marvels', async () => {
        const endpoint = buildApiEndpoint();

        let response = await fetch(endpoint);
        const marvels = await response.json();

        expect(marvels.data.results[0]).not.toBeNull();
    })



})