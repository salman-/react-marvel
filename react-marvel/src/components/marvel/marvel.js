import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

const Marvel = ({ name, thumbnail, id, dataTestid }) => {
     const [marvel,setMarvel] = useState([]);   

     useEffect(()=>{
        getMarvel();
     },[]);

    const getMarvel = () => {
        
    }

    return (

        <div data-testid={`marvel-link-${id}`}>
            <Link to={`/marvels/${id}`}>
            <img
                src={thumbnail}
                alt={name}
                className="img-responsive img-thumbnail"
                data-testid={`marvel-image-${dataTestid}`}
            />
            </Link>
            <h3 data-testid={`marvel-name-${dataTestid}`}>{name}</h3>
        </div>

    );
}

export default Marvel;