import React, { Component } from "react";
import commonImg from "./common_movie_poster.png";

class Details extends Component {
  state = {
    loading: true
  };

  componentDidUpdate(prevProps) {
    if (this.props.imdbID !== prevProps.imdbID) {
      this.setState({ loading: true }, this.fetchDetails);
      this.fetchDetails();
    }
  }

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails() {
    fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${
        this.props.imdbID
      }&plot=full`
    )
      .then(res => res.json())
      .then(data => {
        if (data && data.Response === "True") {
          this.setState({
            title: data.Title,
            year: data.Year,
            type: data.Type,
            language: data.Language,
            genre: data.Genre,
            released: data.Released,
            runtime: data.Runtime,
            director: data.Director,
            imdbRating: data.imdbRating,
            poster: data.Poster,
            plot: data.Plot,
            loading: false
          });
        }
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>loading … </h1>;
    }
    const {
      title,
      year,
      type,
      language,
      genre,
      released,
      director,
      imdbRating,
      poster,
      plot
    } = this.state;
    return (
      <div className="details">
        <div className="imgContainer">
          <img src={poster === "N/A" ? commonImg : poster} alt={title} />
        </div>
        <div>
          <h1>{title}</h1>
          <h2>{`Year : ${year} , Realeased : ${released} , Type :  ${type}`}</h2>
          <h2>{`Language : ${language} , Genre : ${genre} , Imdb Rating : ${imdbRating} `}</h2>
          <h2>{`Director : ${director}`}</h2>
          <p>
            <b>Plot : </b>
            {plot}
          </p>
        </div>
      </div>
    );
  }
}

export default Details;
