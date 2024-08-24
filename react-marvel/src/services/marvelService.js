export const randomlySelectMarvels = (marvelWithThumbnail)=> {
    let randomlySelectedMarvel = [];
    for (let i = 0; i < 6; i++) {
        let index = Math.floor(Math.random() * marvelWithThumbnail.length);
        randomlySelectedMarvel.push(marvelWithThumbnail[index]);
    }
    return randomlySelectedMarvel;
}


export const filterMarvelsWithoutThumbnail = (characters)=> {
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

export function doesNotContainSubstring(mainString, substring) {
    return mainString.indexOf(substring) === -1;
}