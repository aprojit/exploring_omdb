import React, { Component } from "react";
import Results from "./Results";
import Details from "./Details";
import SeriesDetails from "./SeriesDetails";
import { Router, Link } from "@reach/router";
import { Provider } from "./SearchContext";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      page: 1,
      nextButton: true,
      title: "Batman",
      type: "",
      types: ["movie", "series", "game"],
      message: "",
      handleTitleChange: this.handleTitleChange,
      handleTypeChange: this.handleTypeChange,
      handleSearch: this.handleSearch
    };
  }

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
          message = "Nothing Found..!";
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
      <div>
        <header>
          <Link to={"/"}>Exploring OMDb!</Link>
        </header>
        <Provider value={this.state}>
          <Router>
            <Results
              handleNext={this.handleNext}
              handlePrevious={this.handlePrevious}
              movies={this.state.movies}
              nextButton={this.state.nextButton}
              message={this.state.message}
              path="/"
            />

            <Details path="/details/:imdbID" />

            <SeriesDetails path="/seriesDetails/:imdbID" />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
