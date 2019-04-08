import React, { Component } from "react";
import commonImg from "./common_movie_poster.png";
import Modal from "../Modal";

class Details extends Component {
  state = {
    loading: true,
    showModal: false
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

  handleWatchList = () => this.setState({ showModal: !this.state.showModal });

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
      plot,
      showModal
    } = this.state;
    return (
      <div className="details">
        <div className="imgContainer">
          <img src={poster === "N/A" ? commonImg : poster} alt={title} />
        </div>
        <div>
          <h1>{title}</h1>
          <button onClick={this.handleWatchList}>Add To WatchList</button>
          <h2>{`Year : ${year} , Realeased : ${released} , Type :  ${type}`}</h2>
          <h2>{`Language : ${language} , Genre : ${genre} , Imdb Rating : ${imdbRating} `}</h2>
          <h2>{`Director : ${director}`}</h2>
          <p>
            <b>Plot : </b>
            {plot}
          </p>
        </div>

        {showModal && (
          <Modal>
            <div>
              <h3> Are you sure to add "{title}" to WatchList </h3>
              <div className="buttons">
                <button onClick={this.handleWatchList}>Yes</button>
                <button onClick={this.handleWatchList}>No</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default Details;
