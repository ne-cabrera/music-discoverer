import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Comments } from "../../../api/comments";
import CommentList from "../comments/CommentList";
import Stars from "../stars/Stars";
import RateStars from "../stars/RateStars";

class SongDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  selectImageUrl() {
    if(Meteor.user().services.spotify.images.length === 0) {
      return "url('http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png')";
    } else {
      console.log(Meteor.user().services.spotify.images);
      return "url('" + Meteor.user().services.spotify.images[0].url + "')";
    }
  }
  clickShare() {
    let sId = sessionStorage.getItem("sId");
    let comment = document.getElementById("elText").value;
    let usr = Meteor.user().services.spotify;
    console.log(usr, sId, comment);
    Meteor.call("comments.insertComment", sId, comment, usr);
    document.getElementById("elText").value = "";
  }

  rating(num){
    let sId = sessionStorage.getItem("sId");
    Meteor.call("ratings.addRating", sId, num);
  }
  render() {
    console.log(this.props.comments);
    return (
      <div className="songDet">
            <div className="card ">
              <h5 className="card-header">{this.props.song.name}</h5>
              <div className="imgDiv">
                <img className="crd-img" src={this.props.song.album.images[1].url} alt="Song image" />
              </div>
              <div className="card-body laTabla">
                <table className="infobox vcard plainlist text-align">
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
                    <tr>
                      <th colSpan="2" className="thChevere">Rating</th>
                    </tr>
                    <tr>
                      <th colSpan="2">
                        <RateStars/>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card ">
              <h5 className="card-header">Comments & Ratings</h5>
              <div className="card-body">
                <div>
                  <div>Rate it</div>
                  <div><Stars onClick={this.rating}/></div>
                </div>
                <div class="comment-wrap">
                  <div class="photo">
                    <div class="avatar" style={{ backgroundImage: this.selectImageUrl() }}></div>
                  </div>

                  <div class="comment-block">
                    <form action="">
                      <textarea name="" id="elText" cols="30" rows="3" placeholder="Add comment..."></textarea>
                    </form>
                  </div>
                </div>
                <button type="submit" className="btn btn-success green" onClick={this.clickShare.bind(this)}><i class="fa fa-share"></i> Share</button>
                <hr />
                <div class="row losComentarios">
                  {this.props.comments === [] ? "" : <CommentList comments={this.props.comments} />}
                </div>
              </div>
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