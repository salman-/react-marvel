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