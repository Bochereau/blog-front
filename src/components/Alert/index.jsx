import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { dispatchMessage } from "../../actions";

import "./style.scss";

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const light = useSelector((state) => state.lightTheme);

  useEffect(() => {
    if (alert !== "") {
      const timer = setTimeout(() => {
        dispatch(dispatchMessage(""));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  if (!alert) return null;

  return (
    <div className={classNames("alert", {
      "bk-s--light": light === true,
      "bk-s--dark": light === false,
    })}>
      <p className="alert-text">{alert}</p>
    </div>
  );
};

export default Alert;
