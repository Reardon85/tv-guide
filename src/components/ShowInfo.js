import React, {useEffect} from "react";

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
        
        
        showDetails ? <img src={showDetails.image.medium} alt={showDetails.name} />: null
       
        
    )
}

export default ShowInfo