//import './index.css';
import { Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "./Header";
import Home from "./Home";
import SearchResults from "./SearchResults";
import ShowInfo from "./ShowInfo";

function App() {


  const [genreShows, setGenreShows] = useState([])
  const [searchShows, setSearchShows] = useState([])
  const [showDetails, setShowDetails] = useState(null)
 


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
        <Route exact path="/" element={<Home genreShows={genreShows} onSetShowDetails={setShowDetails}  />} />
        <Route path="/search" element={<SearchResults searchShows={searchShows} onSetShowDetails={setShowDetails} />} />
        <Route path="/show/*" element={<ShowInfo showDetails={showDetails}/>} />
      </Routes>
    </div>
  );
}

export default App;