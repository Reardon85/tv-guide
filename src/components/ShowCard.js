
import React from "react";
import { Link } from 'react-router-dom';

const ShowCard = ({ id, image, name, onSetShowDetails}) => {

  const handleClick = () => {

    fetch(`https://api.tvmaze.com/shows/${id}`)
    .then(r => r.json())
    .then(d => {
      console.log(d)
      onSetShowDetails(d)})

  }
   const route = `/show/${id}`
  
  
  return (
    
    <Link to={route} id={id} className="show-card" onClick={handleClick} >
      <img src={image} alt={name} />
      <h3>{name}</h3>
    
    </Link>
   
  );
};

export default ShowCard;
