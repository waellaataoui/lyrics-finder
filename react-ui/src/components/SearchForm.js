import axios from "axios";
import React, { useState } from "react";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Consumer } from "../context";
const SearchForm = () => {
  const [songName, setSongName] = useState("");
  const onChange = (e) => {
    setSongName(e.target.value);
  };
  const onSubmit = (value) => {
    value.dispatch({
      type: "RESET"
    });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?apikey=${process.env.REACT_APP_MM_KEY}&q_track=${songName}&page=1&s_track_rating=desc`
      )
      .then((res) => {
        console.log(res.data);
        value.dispatch({
          type: "SEARCH",
          payload: res.data.message.body.track_list,
          trackName: songName
        });
      })
      .catch((err) => {
        value.dispatch({
          type: "SEARCH",
          payload: [],
          trackName: songName
        });
      });
  };
  return (
    <Consumer>
      {(value) => {
        return (
          <div className="text-center">
            <h1>
              <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon> Search For A
              Song !
            </h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(value);
              }}
            >
              <input
                className="form-control form-control-lg"
                onChange={onChange}
                type="text"
                value={songName}
                placeholder="song name.."
              />
              <button action="submit" className="btn-primary btn-block">
                Search
              </button>
            </form>
          </div>
        );
      }}
    </Consumer>
  );
};
export default SearchForm;
