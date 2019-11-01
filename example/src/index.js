/* eslint-disable */
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./home.js";

const Routers = () => {
  return (
    <Switch>
      <Route path="/" component={ Home } exact />
    </Switch>
  );
};

render(
  <BrowserRouter>
    <Routers />
  </BrowserRouter>,
  document.getElementById("root")
);