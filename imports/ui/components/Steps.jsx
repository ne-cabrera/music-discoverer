import React from "react";

export default class Steps extends React.Component {
  render() {
    return (
      <div>
        <div className="steps">
          <div className="container">
            <div className="row">
              <div className="subtitle content-center col-lg-12 col-md-12 text-center">
                <h2>How to use it</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="info">
                  <div className="">
                    <i class="fa fa-spotify" style={{ fontSize: "58px", color: "#1db954" }}></i>
                    <div className="description">
                      <h4 className="info-title">Login with Spotify</h4>
                      <p className="desc">
                        Login with your spotify account. It doesn't matters if you have a premium account or not.
                        If you don't have a Spotify account, you can create one using our app.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info">
                  <div className="icon icon-success">
                    <i class="fa fa-align-justify" style={{ fontSize: "58px", color: "#1db954" }}></i>
                    <div className="description">
                      <h4 className="info-title">Search by Playlists</h4>
                      <p className="desc">
                        You can search for songs inside your playlists! Select any song and we will show you a bunch of recomended songs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info">
                  <div className="icon icon-success">
                    <i class="fa fa-music" style={{ fontSize: "58px", color: "#1db954" }}></i>
                    <div className="description">
                      <h4 className="info-title">Search by Song</h4>
                      <p className="desc">
                        Tell us your favorite song and we will give you related songs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info">
                  <div className="icon icon-success">
                    <i class="fa fa-microphone" style={{ fontSize: "58px", color: "#1db954" }}></i>
                    <div className="description">
                      <h4 className="info-title">Search by Artist</h4>
                      <p className="desc">
                        Tell us your favorite Artist and we will tell you related artists.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}