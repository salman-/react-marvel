import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./Marvel.css";
import marvels from "../../assets/offlineMarvels.json";

const Marvel = () => {
  const [character, setCharacter] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      getCharacter(id);
    }
  }, [id]);

  const getCharacter = (id) => {
    const marvel = marvels.find((m) => m.id === Number(id));

    if (!marvel) {
      console.error(`Character with id ${id} not found`);
      return;
    }

    const characterName = marvel.name;
    const description = marvel.description;
    const stories = marvel.stories.slice(0, 10); // Max 5 stories
    const url = marvel.url;
    const characterThumbnail = `${marvel.thumbnail}.${marvel.thumbnailExtension}`;

    setCharacter(
        {characterName, characterThumbnail, stories, url, description});
  };

  if (!character) {
    return <div className="marvel-character">Loading...</div>;
  }

  const {
    characterName,
    characterThumbnail,
    stories,
    url,
    description
  } = character;

  return (
      <div className="marvel-character" data-testid={`marvel-link-${id}`}>
        <h2>{characterName}</h2>
        <p className="marvel-description">{description}</p>
        <div className="marvel-content">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={characterThumbnail} alt={characterName}/>
          </a>
          <div className="marvel-stories">
            <h3>Stories</h3>
            <ul>
              {stories.map((story, index) => (
                  <li key={index}>{story}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Marvel;
