import React from "react";

const NoItemExist = (props) => {
  return (
    <div className="mt-5">
      <h1 className="text-center text-warning">No {props.item} Exist.</h1>
    </div>
  );
};

export default NoItemExist;
