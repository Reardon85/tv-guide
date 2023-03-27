
import React from "react";

const ShowCard = ({ id, image, name}) => {
  return (
    <div className="show-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
    
    </div>
  );
};

export default ShowCard;
