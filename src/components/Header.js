import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../HBOMIN.png'
import { Button, Message } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'


const Header = ({ setSearchShows, user }) => {

    const navigate = useNavigate()
  
    const handleSubmit = (e) => {
      console.log(e.target.search.value);
  
      e.preventDefault();
  
      fetch(`https://api.tvmaze.com/search/shows?q=${e.target.search.value}`)
        .then((r) => r.json())
        .then((d) => setSearchShows(d));
        navigate(`/search/`)
        
    };
  
    const handleLogoClick = () => {
      navigate(`/`);
    }
  
    return (
      <header>
        <img
          src={logo}
          alt="HBO Min"
          onClick={handleLogoClick}
        />
        <div className="logout">
        {user.loggedIn ?
<>
        
        <Link to="/login"> Log Out of {user.userName}</Link>
  </>      
      :
      <Link to="/login">Log In</Link>} </div>

        <form onSubmit={handleSubmit}>
          <div className="search-bar" style={{ width: "200px" }}>
            <input type="text" name="search" className="search-input" placeholder="Search for shows" style={{ width: "100%" }} />
            <button type="submit" className="search-btn">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </button>
          </div>
        </form>
       
      </header>
    );
  };
  
  export default Header;