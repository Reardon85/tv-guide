import React from "react";


const ShowCard = ({id, image, name}) => {


    return(
    
      <ul>
        
          <li>
            <img src={image} alt={name} />
            <h3>{name}</h3>
          </li>

      </ul>

    )
}


export default ShowCard

