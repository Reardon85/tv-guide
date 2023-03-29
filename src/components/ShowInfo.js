import React, {useEffect} from "react";
import Discussion from "./Discussion";

const ShowInfo = ({showDetails}) => {

    // useEffect(() => {
    //     fetch(`https://api.tvmaze.com/shows/${id}`)
    //       .then((response) => response.json())
    //       .then((data) => {
    
    //         setGenreShows(data)
            
    //       });
    //   }, []);
    
    
    

    console.log(showDetails)


    return(
        
        <div>
        {showDetails ? 
        <>
        <img src={showDetails.image.medium} alt={showDetails.name} />
        <Discussion id={showDetails.id} /></>
        : 
        null}
        </div>
       
        
    )
}

export default ShowInfo