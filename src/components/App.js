import { Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "./Header";
import Home from "./Home";
import SearchResults from "./SearchResults";
import ShowInfo from "./ShowInfo";



function App() {

  const [shows, setShows] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/shows")
      .then((response) => response.json())
      .then((data) => {
        setShows(data)

      });
  }, []);
  console.log(shows)

  return (
    <div className="App">

      <Header />
      <Routes >
        <Route exact path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/show/" element={<ShowInfo />} />
      </Routes>
    </div>
  );
}

export default App;