import {buildApiEndpoint} from "./helperUtils";
import path from "./endpointsPath.js";

export const randomlySelectMarvels = (marvelWithThumbnail) => {
  let randomlySelectedMarvel = [];
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * marvelWithThumbnail.length);
    randomlySelectedMarvel.push(marvelWithThumbnail[index]);
  }
  return randomlySelectedMarvel;
}

export const filterMarvelsWithoutThumbnail = (characters) => {
  let marvelWithThumbnail = [];
  const limit = Math.min(characters.length, 100);
  for (let i = 0; i < limit; i++) {

    let thumbnailOfMarvel = characters[i].thumbnail.path;
    let validMarvel = doesNotContainSubstring(thumbnailOfMarvel,
        "image_not_available");
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

export const fetchAllCharacters = async () => {
  const limit = 100;
  let offset = 0;
  let allCharacters = [];
  let total = 1564;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const {getCharacters} = path();
  let apiBase = buildApiEndpoint(getCharacters);
  console.log("apiBase: " + apiBase);

  do {
    const api = `${apiBase}?limit=${limit}&offset=${offset}`;
    console.log(`Fetching characters: offset=${offset}`);

    const response = await fetch(api);
    const data = await response.json();

    const filtered = data.data.results.filter(
        (char) => !char.thumbnail.path.includes("image_not_available")
    );

    allCharacters = [...allCharacters, ...filtered];

    total = data.data.total;
    offset += limit;

    // Wait 10 seconds before next request
    if (offset < total) {
      console.log("Waiting 10 seconds before next request...");
      await delay(10000);
    }
  } while (offset < total);

  console.log(`Fetched ${allCharacters.length} characters with thumbnails.`);

  // Write remaining characters to chars.json
  //fs.writeFileSync("chars.json", JSON.stringify(allCharacters, null, 2));
  console.log("All characters with thumbnails saved to chars.json");

  return allCharacters;
};
