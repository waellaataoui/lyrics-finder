import React, { Component } from "react";
import { Consumer, getTopTracks } from "../context";
import Spinner from "./Spinner";
import Track from "./Track";
export default class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const loading = value.track_list === undefined;
          return (
            <div>
              {value.heading !== "Top 10 Tracks" && (
                <button
                  onClick={() => {
                    value.dispatch({ type: "RESET" });
                    getTopTracks().then((res) => {
                      value.dispatch({ type: "CHARTS", payload: res });
                    });
                  }}
                  style={{ marginTop: 20 + "px" }}
                  className="btn-danger btn-md"
                >
                  Top 10 Tracks
                </button>
              )}
              <Spinner loading={loading}></Spinner>

              {!loading && (
                <React.Fragment>
                  <h3 style={{ margin: 30 + "px" }} className="text-center">
                    {value.heading}
                  </h3>
                  <div className="row ">
                    {value.track_list.map(({ track }) => (
                      <Track
                        key={track.track_id}
                        track_id={track.commontrack_id}
                        track_name={track.track_name}
                        artist_name={track.artist_name}
                        album_name={track.album_name}
                      ></Track>
                    ))}
                  </div>
                </React.Fragment>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
