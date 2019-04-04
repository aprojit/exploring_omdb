import React, { Component } from "react";
import { Link } from "@reach/router";
import commonImg from "./common_movie_icon.png";

class Movie extends Component {
  render() {
    const { Title, Year, imdbID, Type, Poster } = this.props;
    return (
      <Link
        to={
          Type === "series" ? `/seriesDetails/${imdbID}` : `/details/${imdbID}`
        }
        className="movieitem"
      >
        <div className="image-container">
          <img src={Poster === "N/A" ? commonImg : Poster} alt={Title} />
        </div>
        <div className="info">
          <h1>{Title}</h1>
          <h2>{`${Year} - ${Type}`}</h2>
        </div>
      </Link>
    );
  }
}

export default Movie;
