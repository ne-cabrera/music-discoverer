import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import ArtistPage from "./components/pages/ArtistPage";
export const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/artists" component={ArtistPage} />
    </Switch>
  </BrowserRouter>
);