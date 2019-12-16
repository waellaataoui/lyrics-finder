import axios from "axios";
import React, { Component } from "react";
import Spinner from "../Spinner";
export default class Lyrics extends Component {
  state = {
    lyrics: undefined,
    album: undefined,
    genres: undefined,
    explicit: undefined,
    altLink: undefined
  };
  componentDidMount = () => {
    console.log(this.props.match.params);
    axios
      .get(
        `https://api.lyrics.ovh/v1/${this.props.match.params.artistName}/${this.props.match.params.trackName}`
      )
      .then((response) => {
        this.setState({ lyrics: response.data.lyrics });
      })
      .catch((err) => {
        this.setState({
          lyrics: `No lyrics available :(`
        });
      });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?apikey=${process.env.REACT_APP_MM_KEY}&commontrack_id=${this.props.match.params.trackId}`
      )
      .then((res) => {
        console.log(res.data);
        const {
          album_name,
          explicit,
          primary_genres: { music_genre_list },
          track_share_url
        } = res.data.message.body.track;
        this.setState((prev) => ({
          ...prev,
          album: album_name,
          explicit: explicit === 0 ? "No" : "Yes",
          genres: music_genre_list
            .map((item) => item.music_genre.music_genre_name)
            .join(),
          altLink: track_share_url
        }));
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { trackName, artistName } = this.props.match.params;
    const loading =
      this.state.lyrics === undefined || this.state.album === undefined;
    return (
      <div className="center-content">
        <h3
          style={{ marginBottom: 20 + "px" }}
          className="text-center "
        >{`${trackName} By ${artistName}`}</h3>
        <Spinner loading={loading}></Spinner>
        {!loading && (
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  {!!this.state.lyrics && (
                    <p style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                      {this.state.lyrics}
                      {this.state.lyrics === "No lyrics available :(" && (
                        <div>
                          You can refer to
                          <a href={this.state.altLink}> this link:</a>
                        </div>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <div className="card-text ">
                    <p> {`Album name: ${this.state.album}`}</p>
                    {`genres: ${this.state.genres}`}
                    <br />
                    {`explicit words: ${this.state.explicit}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
