import React from "react";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

class MainNav extends React.Component {

  handleLogout() {
    sessionStorage.clear();
    localStorage.clear();
    this.props.usr.services = null;
    Meteor.users.remove({ _id: Meteor.userId() });
    Meteor.logout((err) => {
      if(err) {
        console.log(err.reason);
      }
    });
  }

  render() {
    return (
      <div className="elNav">
        <nav className="navbar navbar-expand beta-menu align-items-center fixed-top nav-down navbar-toggleable-sm navbar-short" >
          <div className="container">
            <div className="navbar-translate">
              <div className="navbar-header">
                Music Discoverer
              </div>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link to="/playlists" className="nav-link pl">Playlists</Link>
                </li>
                <li className="nav-item dropdown">
                  <div className="nav-link dropdown-toggle login pl" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Search
                  </div>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link to="/artists" className="dropdown-item">Artists</Link>
                    <Link to="/songSearch" className="dropdown-item">Song</Link>
                  </div>
                </li>
                <li className="nav-item active">
                  <Link to="/" className="nav-link pl" onClick={this.handleLogout.bind(this)}> Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
} export default withTracker(() => {
  return {
    uId: Meteor.userId(),
    usr: Meteor.user()
  };
})(MainNav);
