import React from "react";

const Alert = (props) => {
  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      {props.AlertMessage}
    </div>
  );
};

export default Alert;
