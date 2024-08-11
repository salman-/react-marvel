import React, { useEffect, useState } from "react";
import marvelData from '../../assets/offlineMarvels.json';
import { filterMarvelsWithoutThumbnail, buildThumbnailPath } from '../../services/services';

const Marvels = () => {
  const [marvels, setMarvels] = useState([]);

  useEffect(() => {
    getMarvels();
  }, []);

  const getMarvels = async () => {
    console.log(marvelData.data.results);
    const filteredMarvels = filterMarvelsWithoutThumbnail(marvelData.data.results);
    setMarvels(filteredMarvels);
  };

  return (
    <div data-testid="marvels">
      <h2>Marvels Component!!!</h2>
      <div className="container">
        <div className="row">
          {marvels.map((marvel, index) => {
            const { thumbnail, thumbnailExtention, name } = marvel;

            return (
              <div key={index} className="col-md-4">
                <img
                  src={buildThumbnailPath(thumbnail, thumbnailExtention)}
                  alt={name}
                  className="img-responsive img-thumbnail"
                />
                <h3>{name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marvels;
