// import React from "react";

// const Home = () => {


//     return(
//         <p></p>
//     )
// }

// export default Home


import React, { useState, useEffect } from "react";

const Home = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((data) => setShows(data));
  }, []);

  return (
    <div>
      <h2>All TV Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            <img src={show.image?.medium} alt={show.name} />
            <h3>{show.name}</h3>
            <p>{show.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;