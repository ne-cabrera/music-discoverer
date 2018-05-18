import Meteor from "meteor/meteor";
import React from "react";
import { Login } from "../components/Login";
export class Carousel extends React.Component {
  render() {
    return (
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item i1 active">
              <div className="content-carousel">
                <div className="content-center">
                  <div className="col-md-6 text-left">
                    <h1 className="title">Music Discoverer</h1>
                    <div className="p6">
                      <p align="justify" className="p6">
                        With Music Discoverer you can find new music and new artist in the most interactive way possible.
                        Login with your spotify account and enjoy music in a different way.
                      </p>
                    </div>
                    <br />
                    <div className="buttons">
                      <button className="btn btn-success
                       btn-lg">
                        <Login />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            {/* <div className="carousel-item i2">
            </div>
            <div className="carousel-item i3">
            </div> */}
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    )
  }
}
