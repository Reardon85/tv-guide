import React, { useEffect } from "react";
import Discussion from "./Discussion";
import { Route, Routes, useParams, Link } from "react-router-dom";
import "../index.css";

const ShowInfo = ({ showDetails, onSetShowDetails, user }) => {
  const path = useParams();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${path["*"]}`)
      .then((r) => r.json())
      .then((d) => {
        console.log(d);
        onSetShowDetails(d);
      });
  }, []);

  console.log(showDetails);
  console.log(user);

  return (
    <div className="show-card">
      {showDetails ? (
        <>
          <img src={showDetails.image.medium} alt={showDetails.name} />
          <div>
            <h2>{showDetails.name}</h2>
            <p>
              <b>Official Site:</b>{" "}
              <a href={showDetails.officialSite}>{showDetails.officialSite}</a>
            </p>
            <p>
              <b>Average Runtime:</b> {showDetails.averageRuntime} minutes
            </p>
            {showDetails.network ? (
              <p>
                <b>Network:</b> {showDetails.network.name} (
                {showDetails.network.country.name})
              </p>
            ) : showDetails.webChannel ? (
              <p>
                <b>Web Channel:</b> {showDetails.webChannel.name}
              </p>
            ) : null}
            <p className="summary">{showDetails.summary.replace(/(<([^>]+)>)/gi, "")}</p>
            {showDetails.rating.average && (
              <p className="rating">Rating: {showDetails.rating.average}</p>
            )}
          </div>
          <Discussion id={path["*"]} user={user} />
        </>
      ) : null}
    </div>
  );
};

export default ShowInfo;