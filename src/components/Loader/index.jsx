import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DualRing } from "react-css-spinners/dist/DualRing";

import "./style.scss";

const Loader = ({ text = "Chargement...", className }) => (
  <div className={classNames("loader", className)}>
    <DualRing color="#000" />
    {text && <p className="loader-text">{text}</p>}
  </div>
);

Loader.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default Loader;
