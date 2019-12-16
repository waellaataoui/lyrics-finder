import axios from "axios";
import React, { Component } from "react";
const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        track_list: action.payload,
        heading: `Search Results For ${action.trackName}`
      };
    case "RESET":
      return {
        ...state,
        track_list: undefined,
        heading: "Top 10 Tracks"
      };
    case "CHARTS":
      return {
        ...state,
        track_list: action.payload,
        heading: "Top 10 Tracks"
      };

    default:
      return state;
  }
};
export const getTopTracks = () => {
  return axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=${process.env.REACT_APP_MM_KEY}&chart_name=top&page=1&page_size=10&f_has_lyrics=1&country=us`
    )
    .then((res) => res.data.message.body.track_list)
    .catch((err) => console.log(err));
};

export class Provider extends Component {
  state = {
    track_list: undefined,
    heading: "Top 10 Tracks",
    dispatch: (action) => this.setState((state) => reducer(state, action))
  };

  componentDidMount() {
    getTopTracks().then((res) => {
      console.log(res);
      this.state.dispatch({ type: "CHARTS", payload: res });
    });
    // axios
    //   .get(
    //     `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=${process.env.REACT_APP_MM_KEY}&chart_name=top&page=1&page_size=10&f_has_lyrics=1&country=us`
    //   )
    //   .then((res) => {
    //     this.setState({ track_list: res.data.message.body.track_list });
    //   })
    //   .catch((err) => console.log(err));
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
