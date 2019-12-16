import React from "react";
import { ScaleLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  const center = `
    position :absolute;
      top:50%;
      left:50%;
      transform:translate(-25%,-25%);
    `;
  return (
    <ScaleLoader loading={loading} color={"#44D7B7"} css={center}></ScaleLoader>
  );
};
export default Spinner;
