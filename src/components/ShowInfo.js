import React, {useEffect} from "react";
import Discussion from "./Discussion";
import { Route, Routes, useParams} from "react-router-dom";

const ShowInfo = ({showDetails, onSetShowDetails, user}) => {

     const path = useParams()

     console.log(path['*'])

    useEffect(() => {
           fetch(`https://api.tvmaze.com/shows/${path['*']}`)
    .then(r => r.json())
    .then(d => {
      console.log(d)
      onSetShowDetails(d)})

      }, []);
    
    
    

    console.log(showDetails)


    return(
        
        <div>
        {showDetails ? 
        <>
        <img src={showDetails.image.medium} alt={showDetails.name} />
        <Discussion id={path['*']} user={user} /></>
        : 
        null}
        </div>
       
        
    )
}

export default ShowInfo