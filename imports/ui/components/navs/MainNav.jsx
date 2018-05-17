import React from "react";
import {Link} from "react-router-dom";

export class MainNav extends React.Component {
  render() {
    return (
      <div className="elNav">
        <nav className="navbar navbar-expand-lg fixed-top nav-down" >
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
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
