import React from "react";
import ShowCard from "./ShowCard";

const SearchResults = ({searchShows}) => {

    const resultArray = searchShows.map((show)=> {
        const searchObj = {
            id: show.show.id,
            image: show.show.image.medium,
            name: show.show.name
        }
        console.log(searchObj)
        return searchObj
    }).map((show) => <ShowCard key={show.id} {...show} />)

    return(
        <div className="genre-bar">
            {resultArray}
        </div>
    )
}

export default SearchResults