import React, { Component } from "react";
import Details from "./Details";
import SearchEpisode from "./SearchEpisode";

class SeriesDetails extends Component {
  state = {
    title: "",
    imdbID: this.props.imdbID,
    childimdbID: this.props.imdbID,
    seasons: [],
    season: "",
    episodes: [],
    episode: ""
  };

  componentDidMount() {
    fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${
        this.state.imdbID
      }`
    )
      .then(res => res.json())
      .then(data => {
        let s = 1,
          title = data.Title,
          seasons = [];
        while (s <= data.totalSeasons) {
          seasons.push({ value: s, text: "Season : " + s });
          s++;
        }
        this.setState(
          { title, seasons, season: seasons[0].value },
          this.getEpisodes
        );
      });
  }

  handleSeasonChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.getEpisodes);
  };

  handleEpisodeChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSearch = () => this.setState({ childimdbID: this.state.episode });

  handleTitleClick = () =>
    this.setState(
      { childimdbID: this.state.imdbID, season: this.state.seasons[0].value },
      this.getEpisodes
    );

  getEpisodes() {
    fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${
        this.state.imdbID
      }&Season=${this.state.season}`
    )
      .then(res => res.json())
      .then(data => {
        let episodes = data.Episodes.map(e => {
          return {
            value: e.imdbID.trim(),
            text: e.Title
          };
        });
        this.setState({ episodes, episode: episodes[0].value });
      });
  }

  render() {
    return (
      <div className="search">
        <div className="seriesTitle">
          <button onClick={this.handleTitleClick}>{this.state.title}</button>
        </div>

        <SearchEpisode
          handleSeasonChange={this.handleSeasonChange}
          handleEpisodeChange={this.handleEpisodeChange}
          handleSearch={this.handleSearch}
          {...this.state}
        />

        <Details imdbID={this.state.childimdbID} />
      </div>
    );
  }
}

export default SeriesDetails;
