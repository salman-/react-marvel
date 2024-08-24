import React, { useEffect, useState } from "react";
import marvelData from '../../assets/offlineMarvels.json';
import { filterMarvelsWithoutThumbnail, buildThumbnailPath } from '../../services/services';
import Marvel from "../marvel/marvel";

const Marvels = () => {
  const [marvels, setMarvels] = useState([]);

  useEffect(() => {
    getMarvels();
  }, []);

  const getMarvels = async () => {
    const filteredMarvels = filterMarvelsWithoutThumbnail(marvelData.data.results);
    setMarvels(filteredMarvels);
  };

  return (
    
    <div data-testid="marvels">
      <h1>Welcome To Marvel Land</h1>
      <div className="container">
        <div className="row">
          {marvels.map((marvel, index) => {
            const { thumbnail, thumbnailExtention, name, id } = marvel;
            return (
              <div data-testid={`marvelId-${index}`} className="col-md-4">
                <Marvel name={name} thumbnail={buildThumbnailPath(thumbnail, thumbnailExtention)} id={id} dataTestid={index} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marvels;
