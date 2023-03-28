import React from "react";
import ShowCard from "./ShowCard";


const SearchResults = ({searchShows, onSetShowDetails}) => {

    const resultArray = searchShows.map((show)=> {
        const image = show.show.image ? show.show.image.medium : "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
        console.log(image)
        const searchObj = {
            id: show.show.id,
            image: image,
            name: show.show.name
        }
        console.log(searchObj)
        return searchObj
    }).map((show) => <ShowCard key={show.id} {...show} onSetShowDetails={onSetShowDetails} />)

    return(
        <div className="genre-bar">
            {resultArray}
        </div>
    )
}

export default SearchResults


