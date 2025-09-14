import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { buildApiEndpoint, buildThumbnailPath } from "./../../services/services";
import path from "./../../services/endpointsPath";
import "./Marvel.css";

const Marvel = () => {
    const [character, setCharacter] = useState({});
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getCharacter(id);
        }
    }, [id]);

    const getCharacter = async (id) => {
        const { getCharacterById } = path();
        let api = buildApiEndpoint(getCharacterById);
        api = api.replace("{characterId}", id);

        const response = await fetch(api);
        const jsonData = await response.json();
        const marvel = jsonData.data.results[0];

        const characterName = marvel.name;
        const characterThumbnail = buildThumbnailPath(marvel.thumbnail.path, marvel.thumbnail.extension);
        setCharacter({ characterName, characterThumbnail });
    };

    const { characterName, characterThumbnail } = character;

    return (
        <div className="marvel-character" data-testid={`marvel-link-${id}`}>
            <h2>{characterName}</h2>
            <Link to={`/marvels/${id}`}>
                <img src={characterThumbnail} alt={characterName} />
            </Link>
        </div>
    );
};

export default Marvel;
