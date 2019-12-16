import React from "react";
import { Link } from "react-router-dom";
import { faCompactDisc, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Track = ({ track_name, artist_name, track_id, album_name }) => {
  return (
    <div className="col-md-6 " key={track_id}>
      <div className="card mb-4">
        <div className="card-body">
          <h5> {track_name}</h5>
          <p className="card-text">
            <FontAwesomeIcon icon={faMicrophone}></FontAwesomeIcon>{" "}
            <strong> artist:</strong> {`  ${artist_name}`}
          </p>
          <p className="card-text">
            <FontAwesomeIcon icon={faCompactDisc}></FontAwesomeIcon>{" "}
            <strong>album:</strong> {`${album_name}`}
          </p>
          <Link to={`/lyrics/${artist_name}/${track_name}/${track_id}`}>
            <button className="btn-primary btn-block">View lyrics</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Track;
