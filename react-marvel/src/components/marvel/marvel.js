import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { buildApiEndpoint, buildThumbnailPath } from "./../../services/services";
import path from "./../../services/endpointsPath";

const Marvel = () => {
    const [character, setCharacter] = useState({}); // Initial state with props
    const { id } = useParams();  // Get the 'id' from the route parameters

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
        const characterThumbnail = buildThumbnailPath(marvel.thumbnail.path, marvel.thumbnail.extension); // Constructing thumbnail URL
        setCharacter({ characterName, characterThumbnail });
    };

    const { characterName, characterThumbnail } = character;

    return (
        <div data-testid={`marvel-link-${id}`}>
            <h2>{characterName}</h2>
            <Link to={`/marvels/${id}`}>
                <img src={characterThumbnail} className="img-responsive img-thumbnail" />
            </Link>

        </div>
    );
};

export default Marvel;
