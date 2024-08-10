import React, { useEffect, useState } from "react";
import Marvel from "../marvel/marvel";

const Marvels = () => {
  let [marvels, setMarvels] = useState([]);

  useEffect(() => {
    getMarvels();
  }, []);

  let getMarvels = async () => {
    const response = await fetch("http://localhost:5000/marvels");
    const data = await response.json();
    console.log(data);
    setMarvels(data);
  };

  return (
    <div data-testid="marvels">
      <h2>Marvels Component!!!</h2>
      <div>
        {marvels.length > 0 &&
          marvels.map(marvel => {
            return (
              <Marvel id={marvel.data.results[0].id} name={marvel.data.results[0].name} description={marvel.data.results[0].description} />
            );
          })}
      </div>
    </div>
  );
};

export default Marvels;
