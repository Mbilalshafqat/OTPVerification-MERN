import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Registration from "./Account/Registration";
import Login from "./Account/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" exact element={<Home />} />

        <Route path="/" exact element={<Registration />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
