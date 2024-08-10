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
        const hash = generateHash();
        expect(hash).not.toBeNull()
    });

    it('builds the request parameters correctly', () => {
        const env = environment();
        expect(env).toHaveProperty('publicKey', '1098114a1b4e71641fb1e0a0184afbcf');
        const { publicKey } = environment();
        let timeStamp = new Date().getTime();
        const hash = generateHash();

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