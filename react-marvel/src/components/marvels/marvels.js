import React, { useEffect, useState } from "react";
import Marvel from "../marvel/marvel";
import marvelData from '../../assets/offlineMarvels.json';
import {filterMarvelsWithoutThumbnail} from '../../services/services';

const Marvels = () => {
  let [marvels, setMarvels] = useState([]);

  useEffect(() => {
    getMarvels();
  }, []);

  let getMarvels = async () => {

    console.log(marvelData.data.results);
    filterMarvelsWithoutThumbnail(marvelData.data.results);
    setMarvels(marvelData.data.results);
  };

  return (
    <div data-testid="marvels">
      <h2>Marvels Component!!!</h2>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <img src="https://via.placeholder.com/400x300" alt="Image 1" class="img-responsive img-thumbnail"/>
          </div>
          <div class="col-md-4">
            <img src="https://via.placeholder.com/400x300" alt="Image 2" class="img-responsive img-thumbnail"/>
          </div>
          <div class="col-md-4">
            <img src="https://via.placeholder.com/400x300" alt="Image 3" class="img-responsive img-thumbnail"/>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <img src="https://via.placeholder.com/400x300" alt="Image 4" class="img-responsive img-thumbnail"/>
          </div>
          <div class="col-md-4">
            <img src="https://via.placeholder.com/400x300" alt="Image 5" class="img-responsive img-thumbnail"/>
          </div>
          <div class="col-md-4">
            <img src="https://via.placeholder.com/400x300" alt="Image 6" class="img-responsive img-thumbnail"/>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Marvels;
