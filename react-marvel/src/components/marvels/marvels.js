import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import marvelData from "../../assets/offlineMarvels.json";
import { filterMarvelsWithoutThumbnail } from "../../services/marvelService";
import { buildThumbnailPath } from "../../services/services";
import "./Marvels.css";

const Marvels = () => {
  const [marvels, setMarvels] = useState([]);

  useEffect(() => {
    getMarvels();
  }, []);

  const getMarvels = async () => {
    const marvelsWithThumbnail = filterMarvelsWithoutThumbnail(
        marvelData.data.results
    );
    setMarvels(marvelsWithThumbnail);
  };

  return (
      <div className="marvels-page" data-testid="marvels">
        <h1 className="page-title">Welcome To Marvel Land</h1>

        <div className="marvels-grid">
          {marvels.map((marvel, index) => {
            const { thumbnail, thumbnailExtention, name, id } = marvel;
            return (
                <div
                    key={id}
                    className="marvel-card"
                    data-testid={`marvelId-${index}`}
                >
                  <Link
                      to={`/marvels/${id}`}
                      className="marvel-link"
                      data-testid={`marvel-link-${id}`}
                  >
                    <img
                        src={buildThumbnailPath(thumbnail, thumbnailExtention)}
                        alt={name}
                        className="marvel-image"
                        data-testid={`marvel-image-${index}`}
                    />
                    <h3 className="marvel-name" data-testid={`marvel-name-${index}`}>
                      {name}
                    </h3>
                  </Link>
                </div>
            );
          })}
        </div>
      </div>
  );
};

export default Marvels;
