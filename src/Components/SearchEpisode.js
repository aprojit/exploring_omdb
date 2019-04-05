import React, { Component } from "react";
class SearchEpisode extends Component {
  render() {
    return (
      <div className="search-params">
        <label htmlFor="season">
          Select Season
          <select
            id="season"
            name="season"
            value={this.props.season}
            onChange={this.props.handleSeasonChange}
          >
            {this.props.seasons.map(season => (
              <option key={season.value} value={season.value}>
                {season.text}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="episode">
          Select Episode
          <select
            id="episode"
            name="episode"
            value={this.props.episode}
            onChange={this.props.handleEpisodeChange}
          >
            {this.props.episodes.map(episode => (
              <option key={episode.value} value={episode.value}>
                {episode.text}
              </option>
            ))}
          </select>
        </label>

        <button style={{ float: "left" }} onClick={this.props.handleSearch}>
          Search Episode
        </button>
      </div>
    );
  }
}

export default SearchEpisode;
