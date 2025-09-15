import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {buildThumbnailPath} from "../../services/helperUtils";
import "./Marvel.css";
import {getCharacterById} from "../../services/marvelService";

const Marvel = () => {
  const [character, setCharacter] = useState({});
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      getCharacter(id);
    }
  }, [id]);

  const getCharacter = async (id) => {
    const marvel = await getCharacterById(id);

    const characterName = marvel.name;
    const characterThumbnail = buildThumbnailPath(marvel.thumbnail.path,
        marvel.thumbnail.extension);
    setCharacter({characterName, characterThumbnail});
  };

  const {characterName, characterThumbnail} = character;

  return (
      <div className="marvel-character" data-testid={`marvel-link-${id}`}>
        <h2>{characterName}</h2>
        <Link to={`/marvels/${id}`}>
          <img src={characterThumbnail} alt={characterName}/>
        </Link>
      </div>
  );
};

export default Marvel;
