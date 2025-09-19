import {buildApiEndpointWithOffset, delay} from "./helperUtils";
import path from "./endpointsPath.js";

// 1. Get the url of type "comiclink" or return default
function getComicLinkUrl(character) {
  if (!Array.isArray(character.urls)) {
    return "http://marvel.com";
  }

  const comicLink = character.urls.find(u => u.type === "comiclink");
  return comicLink ? comicLink.url : "http://marvel.com";
}

// 2. Get the list of story names
function getStoryList(character) {
  return character.stories.items.map(story => story.name);
}


export const filterMarvelsWithoutThumbnail = (characters) => {
  let marvelWithThumbnail = new Set();
  const limit = Math.min(characters.length, 100);
  for (let i = 0; i < limit; i++) {

    let thumbnailOfMarvel = characters[i].thumbnail.path;
    let validMarvel = doesNotContainSubstring(thumbnailOfMarvel,
        "image_not_available");
    if (validMarvel) {

      const marvel = {
        id: characters[i].id,
        thumbnail: characters[i].thumbnail.path,
        thumbnailExtension: characters[i].thumbnail.extension,
        description: characters[i].description,
        name: characters[i].name,
        stories: getStoryList(characters[i]),
        url: getComicLinkUrl(characters[i])
      };
      marvelWithThumbnail.add(marvel);
    }
  }
  return marvelWithThumbnail;
}

export function doesNotContainSubstring(mainString, substring) {
  return mainString.indexOf(substring) === -1;
}

async function getAllCharactersUpToGivenIndex(offset) {
  const {getCharacters} = path();
  let api = buildApiEndpointWithOffset(getCharacters, offset);

  const response = await fetch(api);
  const responseBody = await response.json();

  return responseBody.data.results;
}

export const fetchAllCharacters = async () => {
  let offset = 0;
  const offsetIncrement = 100;
  let total = 1564;
  const allCharacters = new Set();

  while (offset <= total) {
    const characters = await getAllCharactersUpToGivenIndex(offset);
    const charactersWithThumbNail = filterMarvelsWithoutThumbnail(characters);
    console.log(
        `Offset: ${offset} Fetched ${charactersWithThumbNail.size} characters with thumbnails.`);
    offset += offsetIncrement;
    await delay(10000);
    charactersWithThumbNail.forEach(value => allCharacters.add(value));
  }
  console.log(`allCharacters: ${JSON.stringify([...allCharacters])}`);
  return allCharacters;
};
