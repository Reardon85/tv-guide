import React from "react";

const Header = ({ setSearchShows }) => {

  const handleSubmit = (e) => {
    console.log(e.target.search.value);

    e.preventDefault();

    fetch(`https://api.tvmaze.com/search/shows?q=${e.target.search.value}`)
      .then((r) => r.json())
      .then((d) => setSearchShows(d));
  };

  return (
    <header>
      <img
        src="https://s3.amazonaws.com/media.mediapost.com/dam/cropped/2022/07/14/hbomin-600_K0kz8T5.jpg"
        alt="HBO Min"
      />
      <p>hello</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" />
        <button type="submit">Search Shows</button>
      </form>
    </header>
  );
};

export default Header;