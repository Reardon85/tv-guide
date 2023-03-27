import React from "react";


const Header = ({setSearchShows}) => {

    const handleSubmit = (e)=> {
        console.log(e.target.search.value)

        e.preventDefault()

        fetch(`https://api.tvmaze.com/search/shows?q=${e.target.search.value}`)
        .then(r => r.json())
        .then(d => setSearchShows(d))


    }


    return(
        <>
        <h1>HBO Min</h1>

        <p>hello</p>
        <form onSubmit={handleSubmit} >
            <input type="text" name="search"   />
            <button type="submit"> Search Shows</button>

        </form>

        </>
        
    )
}

export default Header