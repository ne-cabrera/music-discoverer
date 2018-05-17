import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Comments } from "../../../api/comments";

class SongDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  render() {
    console.log(this.props.comments);
    return (
      <div className="card">
        <h5 className="card-header">{this.props.song.name}</h5>
        <div className="imgDiv">
          <img className="crd-img" src={this.props.song.album.images[1].url} alt="Song image" />
        </div>
        <div className="card-body">
          <table className="infobox vcard plainlist">
            <tbody className="elBody">
              <tr>
                <th colSpan="2" className="thChevere">Song Information</th>
              </tr>
              <tr>
                <th scope="row">Artist</th>
                <td>{this.props.song.artists[0].name}</td>
              </tr>
              <tr>
                <th scope="row">Album</th>
                <td>{this.props.song.album.name}</td>
              </tr>
              <tr>
                <th scope="row"> Duration </th>
                <td>{this.millisToMinutesAndSeconds(this.props.song.duration_ms)}</td>
              </tr>
              <tr>
                <th colSpan="2" className="thChevere">Preview</th>
              </tr>
              <tr>
                <th colSpan="2">
                  {this.props.song.preview_url !== null ? <audio controls src={this.props.song.preview_url}></audio> : "Sorry, we don't have a preview"}
                </th>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    );
  }

}
export default withTracker(() => {
  Meteor.subscribe("comments");
  let sId = sessionStorage.getItem("sId");
  return {
    comments: Comments.find({ songId: sId }).fetch()
  };
})(SongDetail);