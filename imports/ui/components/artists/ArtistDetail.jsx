import React from "react";
import { Meteor } from "meteor/meteor";

export default class ArtistDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <div className="col-md-12">
        <div className="card" id="cardArtist">
          <h5 className="card-header">{this.props.info.name}</h5>
          <div className="imgDiv">
            <img className="crd-img" src={this.props.info.images[1].url} alt="Song image" />
          </div>
          <div className="card-body">
            <table className="infobox vcard plainlist">
              <tbody className="elBody">
                <tr>
                  <th colSpan="2" className="thChevere">Artist Information</th>
                </tr>
                <tr>
                  <th scope="row">Artist</th>
                  <td>{this.props.info.name}</td>
                </tr>
                <tr>
                  <th scope="row">Genres</th>
                  <td>
                    <div className="hlist">
                      <ul>
                        {this.props.info.genres.map((g, i) => (
                          <li key={i}> <a>{g}</a></li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Followers on Spotify</th>
                  <td>{this.props.info.followers.total}</td>
                </tr>

                <tr>
                  <th colSpan="2" className="thChevere">Top Tracks</th>
                </tr>
                <tr>
                  <th scope="name">{this.props.songs.tracks[0].name}</th>
                  <td>
                    <audio controls src={this.props.songs.tracks[0].preview_url}></audio>
                  </td>
                </tr>
                <tr>
                  <th scope="name">{this.props.songs.tracks[1].name}</th>
                  <td>
                    <audio controls src={this.props.songs.tracks[1].preview_url}></audio>
                  </td>
                </tr>
                <tr>
                  <th scope="name">{this.props.songs.tracks[2].name}</th>
                  <td>
                    <audio controls src={this.props.songs.tracks[2].preview_url}></audio>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}