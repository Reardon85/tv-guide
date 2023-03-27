import { Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "./Header";
import Home from "./Home";
import SearchResults from "./SearchResults";
import ShowInfo from "./ShowInfo";



function App() {


  const [genreShows, setGenreShows] = useState([])
  const [searchShows, setSearchShows] = useState([])


  useEffect(() => {
    fetch("http://localhost:3000/shows")
      .then((response) => response.json())
      .then((data) => {

        setGenreShows(data)
        
      });
  }, []);

  console.log(searchShows)


  return (
    <div className="App">

      <Header setSearchShows={setSearchShows} />
      <Routes >
        <Route exact path="/" element={<Home genreShows={genreShows} />} />
        <Route path="/search" element={<SearchResults searchShows={searchShows} />} />
        <Route path="/show/" element={<ShowInfo />} />
      </Routes>
    </div>
  );
}

export default App;