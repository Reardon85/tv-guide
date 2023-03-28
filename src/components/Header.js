import React from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../HBOMIN.png'

const Header = ({ setSearchShows }) => {

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
      
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <input type="text" name="search" className="search-input" placeholder="Search for shows" />
          <button type="submit" className="search-btn">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;