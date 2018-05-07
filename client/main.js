import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
 
import App from "../imports/ui/App";
import {AppRoutes} from "../imports/ui/Routes";
 
Meteor.startup(() => {
  render(<AppRoutes />, document.getElementById("render-target"));
});