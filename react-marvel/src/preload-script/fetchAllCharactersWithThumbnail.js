import {buildApiEndpointWithOffset, delay} from "../services/helperUtils.js";
import {filterMarvelsWithoutThumbnail} from "../services/marvelService.js";
import legendPath from "../services/endpointsPath.js";

import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";

// Equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
    Based on Term of Use of Marvel:
    We are not allowed to Fetch the marvel resources permanently. So, before runnign the app we fetch it.
    in future every day, we should fetch again and re-write the offlineMarvels.json

 */

async function getAllCharactersUpToGivenIndex(offset) {
  const {getCharacters} = legendPath();
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
        `Offset: ${offset} Fetched ${charactersWithThumbNail.size} characters with thumbnails.`
    );
    offset += offsetIncrement;
    await delay(10000);
    charactersWithThumbNail.forEach((value) => allCharacters.add(value));
  }
  console.log(`allCharacters: ${JSON.stringify([...allCharacters])}`);
  //return allCharacters;
  return Array.from(allCharacters);
};

// For now, static example (replace with await fetchAllCharacters())
const result = await fetchAllCharacters();

// Write result to a JSON file in /src/assets
const outputPath = path.join(__dirname, "../assets/offlineMarvels.json");

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

console.log("✅ Config file generated before app start:", outputPath);
