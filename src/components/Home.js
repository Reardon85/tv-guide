import React from "react";
import ShowCard from "./ShowCard";

const Home = ({genreShows}) => {

    const comedyShows = genreShows.filter((show) => show.genres === "Comedy").map((show) => <ShowCard key={show.id} {...show} />)
    const thrillerShows = genreShows.filter((show) => show.genres === "Thriller").map((show) => <ShowCard key={show.id} {...show} />)
    const dramaShows = genreShows.filter((show) => show.genres === "Drama").map((show) => <ShowCard key={show.id} {...show} />)


    return(
        <div>
            <h2>Comedy</h2>
            {comedyShows}
            <h2>Thriller</h2>
            {thrillerShows}
            <h2>Drama</h2>
            {dramaShows}

    
        </div>
    )
}

export default Home


// import React, { useState, useEffect } from "react";

// const Home = () => {
//   const [shows, setShows] = useState([]);

//   useEffect(() => {
//     fetch("https://api.tvmaze.com/shows")
//       .then((response) => response.json())
//       .then((data) => setShows(data));
//   }, []);

//   return (
//     <div>
//       <h2>All TV Shows</h2>
//       <ul>
//         {shows.map((show) => (
//           <li key={show.id}>
//             <img src={show.image?.medium} alt={show.name} />
//             <h3>{show.name}</h3>
//             <p>{show.summary}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;