import React, { Component } from "react";
import Movie from "./Movie";
import SearchParams from "./SearchParams";

class Results extends Component {
  

  render() {
    return (
      <div className="search">

        <SearchParams   />

        {this.props.message === "" ? (
          this.props.movies.map(movie => {
            return <Movie key={movie.imdbID} {...movie} />;
          })
        ) : (
          <h1> {this.props.message} </h1>
        )}

        <div className="page">
          <button onClick={this.props.handlePrevious}>Previous</button>
          {this.props.nextButton && (
            <button onClick={this.props.handleNext}>Next</button>
          )}
        </div>
        
      </div>
    );
  }
}

export default Results;
