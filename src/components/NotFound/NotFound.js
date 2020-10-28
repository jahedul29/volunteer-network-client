import React from "react";

const NotFound = () => {
  document.title = "Page NotFound";

  return (
    <div className="mt-5">
      <h1 className="text-center text-danger">This Page Doesn't</h1>
      <h1 className="text-center text-danger">EXIST!!</h1>
    </div>
  );
};

export default NotFound;
