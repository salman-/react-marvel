import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { buildApiEndpoint, buildThumbnailPath } from "./../../services/services";
import path from "./../../services/endpointsPath";

const Marvel = ({ name: propName, thumbnail: propThumbnail, id: propId, dataTestid }) => {
    const [marvel, setMarvel] = useState({ name: propName, thumbnail: propThumbnail }); // Initial state with props
    const { id: routeId } = useParams();  // Get the 'id' from the route parameters
    const id = propId || routeId;  // Use 'propId' if available, otherwise 'routeId'

    useEffect(() => {
        if (id && (!propName || !propThumbnail)) {  // Fetch only if props not provided
            getMarvel(id);
        }
    }, [id, propName, propThumbnail]);

    const getMarvel = async (id) => {
        const { getCharacterById } = path();
        let api = buildApiEndpoint(getCharacterById);
        api = api.replace("{characterId}", id);
        console.log(`api: ${api}`);

        try {
            const response = await fetch(api);
            const jsonData = await response.json();
            console.log(jsonData.data.results);

            if (jsonData.data.results.length > 0) {
                const character = jsonData.data.results[0]; // Assuming the first result is correct
                const characterName = character.name; // Changed 'name' to 'characterName'
                const characterThumbnail = buildThumbnailPath(character.thumbnail.path, character.thumbnail.extension); // Constructing thumbnail URL

                setMarvel({ name: characterName, thumbnail: characterThumbnail });
            }
        } catch (error) {
            console.error("Error fetching Marvel character:", error);
        }
    };

    return (
        <div data-testid={`marvel-link-${id}`}>
            <Link to={`/marvels/${id}`}>
                <img
                    src={marvel.thumbnail}
                    alt={marvel.name} // Changed 'name' to 'marvel.name'
                    className="img-responsive img-thumbnail"
                    data-testid={`marvel-image-${dataTestid}`}
                />
            </Link>
            <h3 data-testid={`marvel-name-${dataTestid}`}>{marvel.name}</h3> {/* Changed 'name' to 'marvel.name' */}
        </div>
    );
};

export default Marvel;
