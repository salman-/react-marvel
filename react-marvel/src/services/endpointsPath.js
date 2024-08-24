// endpointsPath.js
const path = () => {
    const getCharacterById = '/v1/public/characters/{characterId}';
    const getCharacters = '/v1/public/characters';
    

    return { getCharacterById, getCharacters };
}

export default path;
