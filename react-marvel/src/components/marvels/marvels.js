import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import marvelsWithThumbnail from "../../assets/offlineMarvels.json";
import {buildThumbnailPath, shuffle} from "../../services/helperUtils";
import "./Marvels.css";

function shuffleMarvels() {
  // Ensure uniqueness by `id` instead of object reference
  const uniqueById = Array.from(
      new Map(marvelsWithThumbnail.map(m => [m.id, m])).values()
  );
  return shuffle(uniqueById);
}

const Marvels = () => {
  const [marvels, setMarvels] = useState([]);

  const marvelsPerPage = 8;

  useEffect(() => {
    getMarvels();
  }, []);

  const getMarvels = () => {
    const uniqueMarvelsWithThumbnail = shuffleMarvels();
    const firstEightMarvels = uniqueMarvelsWithThumbnail.slice(0,
        marvelsPerPage);
    setMarvels(firstEightMarvels);
  };

  return (
      <div className="marvels-page" data-testid="marvels">
        <div className="marvels-grid">
          {marvels.map((marvel, index) => {
            const {thumbnail, thumbnailExtension, name, id, url} = marvel;
            return (
                <div
                    key={id}
                    className="marvel-card"
                    data-testid={`marvelId-${index}`}
                >
                  <Link
                      to={`${url}`}
                      className="marvel-link"
                      data-testid={`marvel-link-${id}`}
                  >
                    <img
                        src={buildThumbnailPath(thumbnail, thumbnailExtension)}
                        alt={name}
                        className="marvel-image"
                        data-testid={`marvel-image-${index}`}
                    />
                  </Link>
                  <Link
                      to={`/marvels/${id}`}
                      className="marvel-link"
                      data-testid={`marvel-link-${id}`}
                  >
                    <h3
                        className="marvel-name"
                        data-testid={`marvel-name-${index}`}
                    >
                      {name}
                    </h3>
                  </Link>
                </div>
            );
          })}
        </div>

        <div className="shuffler">
          <button className="shuffle-btn" onClick={getMarvels}>
            Shuffle Marvels
          </button>
        </div>
      </div>
  );
};

export default Marvels;
