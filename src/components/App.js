//import './index.css';
import { Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "./Header";
import Home from "./Home";
import SearchResults from "./SearchResults";
import ShowInfo from "./ShowInfo";
import LogIn from "./LogIn";
import Register from "./Register";


function App() {


  const [genreShows, setGenreShows] = useState([])
  const [searchShows, setSearchShows] = useState([])
  const [showDetails, setShowDetails] = useState(null)
  const [user, setUser] = useState({
    loggedIn: false,
    userName: '',
    avatar: '',
    ip: ''
  })
  let address;


  const checkLogIn = (iP) => {

    fetch(`http://localhost:3000/status/${iP}`)
    .then(r => r.json())
    .then(d =>{
      if(Object.keys(d).length !== 0 && d.loggedIn){
        setUser((user) => ({
          ...user, 
          loggedIn: true,
          userName: d.userName,
          avatar: d.avatar,
          ip: d.id
        }))
      } 

    })

  }
 


  useEffect(() => {
    fetch("http://localhost:3000/shows")
      .then((response) => response.json())
      .then((data) => {

        setGenreShows(data)
        
      });

      fetch('https://geolocation-db.com/json/')
      .then((response) => response.json())
      .then((data) => {

        setUser((user) => ({
          ...user,
          ip: data.IPv4
        }))
        checkLogIn(data.IPv4)
        
      });
  }, []);

  console.log(user)


  return (
    <div className="App">

      <Header setSearchShows={setSearchShows} />
      <Routes >
        <Route exact path="/" element={<Home genreShows={genreShows}   />} />
        <Route path="/search" element={<SearchResults searchShows={searchShows} />} />
        <Route path="/show/*" element={<ShowInfo showDetails={showDetails} onSetShowDetails={setShowDetails} user={user}/>} />
        <Route path="/login" element={<LogIn user={user} onSetUser={setUser}/>} />
        <Route path="/register" element={<Register user={user} onSetUser={setUser}/>} />
      </Routes>
    </div>
  );
}

export default App;