import { Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "./Header";
import Home from "./Home";
import SearchResults from "./SearchResults";
import ShowInfo from "./ShowInfo";



function App() {


  const [genreShows, setGenreShows] = useState([])


  useEffect(() => {
    fetch("http://localhost:3000/shows")
      .then((response) => response.json())
      .then((data) => {

        setGenreShows(data)
        
      });
  }, []);

  console.log(genreShows)


  return (
    <div className="App">

      <Header />
      <Routes >
        <Route exact path="/" element={<Home genreShows={genreShows} />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/show/" element={<ShowInfo />} />
      </Routes>
    </div>
  );
}

export default App;