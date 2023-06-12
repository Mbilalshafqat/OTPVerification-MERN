import React from "react";

const Home = () => {
  return (
    <div>
      <h1>
        {" "}
        {localStorage.getItem("name") && localStorage.getItem("name")} welcome
        back
      </h1>
    </div>
  );
};

export default Home;
