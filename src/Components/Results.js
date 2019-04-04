import React, { Component } from "react";
import Movie from "./Movie";

class Results extends Component {
  state = {
    movies: [],
    page: 1,
    nextButton: true,
    title: "Batman",
    type: "",
    types: ["movie", "series", "game"],
    message: ""
  };
  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies() {
    const { title, type, page } = this.state;
    fetch(
      `http://www.omdbapi.com/?apikey=${
        process.env.REACT_APP_API_KEY
      }&s=${title.replace(/\s+/g, "+")}${
        type !== "" ? `&type=${type}` : ``
      }&page=${page}`
    )
      .then(res => res.json())
      .then(data => {
        let movies,
          message = "",
          nextButton = true;
        if (data && data.Response === "True") {
          movies = data.Search;
        } else {
          movies = [];
          nextButton = false;
          message = "No Content Found..!";
        }
        this.setState({ movies, nextButton, message });
      })
      .catch(err => console.log(err));
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 }, this.fetchMovies);
  };

  handlePrevious = () => {
    this.state.page > 1 &&
      this.setState({ page: this.state.page - 1 }, this.fetchMovies);
  };

  handleTitleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.fetchMovies);
  };

  handleTypeChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSearch = () => {
    this.setState({ page: 1 }, this.fetchMovies);
  };

  render() {
    return (
      <div className="search">
        <div className="search-params">
          <label htmlFor="title">
            Title
            <input
              id="title"
              name="title"
              value={this.state.title}
              placeholder="Title"
              onChange={this.handleTitleChange}
            />
          </label>

          <label htmlFor="type">
            Type
            <select
              id="type"
              name="type"
              value={this.state.type}
              onChange={this.handleTypeChange}
            >
              <option value="">--Select--</option>
              {this.state.types.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <button
            style={{ float: "left", marginBottom: 30 }}
            onClick={this.handleSearch}
          >
            Search
          </button>
        </div>
        {this.state.message === "" ? (
          this.state.movies.map(movie => {
            return <Movie key={movie.imdbID} {...movie} />;
          })
        ) : (
          <h1> {this.state.message} </h1>
        )}

        <div className="page">
          <button onClick={this.handlePrevious}>Previous</button>
          {this.state.nextButton && (
            <button onClick={this.handleNext}>Next</button>
          )}
        </div>
      </div>
    );
  }
}

export default Results;
