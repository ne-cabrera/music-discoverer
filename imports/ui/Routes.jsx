import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import MainContainer from "./components/playlists/MainContainer";

import ArtistPage from "./components/pages/ArtistPage";
export const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/artists" component={ArtistPage} />
      <Route exact path="/playlists" component={MainContainer} />
    </Switch>
  </BrowserRouter>
);