import React, { Component } from "react";
import Results from "./Results";
import Details from "./Details";
import SeriesDetails from "./SeriesDetails";
import { Router, Link } from "@reach/router";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to={"/"}>Exploring OMDb!</Link>
        </header>
        <Router>
          <Results path="/" />
          <Details path="/details/:imdbID" />
          <SeriesDetails path="/seriesDetails/:imdbID" />
        </Router>
      </div>
    );
  }
}

export default App;
