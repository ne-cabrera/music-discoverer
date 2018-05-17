import React from "react";
import { Meteor } from "meteor/meteor";
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  selectImageUrl() {
    console.log(this.props.info);
    if(this.props.info.user.images === []) {
      return "url('http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png')";
    } else {
      console.log(this.props.info.user.images[0].url);
      return "url('" + this.props.info.user.images[0].url + "')";
    }
  }

  render() {
    return (
      <div className="comment-wrap">
        <div className="photo">
          <div className="avatar" style={{ backgroundImage: this.selectImageUrl() }}></div>
        </div>
        <div className="comment-block">
          <div>
            <p><b>{this.props.info.user.id}</b></p>
          </div>
          <p className="comment-text">{this.props.info.comment}</p>
          <div className="bottom-comment">
            <div className="comment-date">Aug 24, 2014 @ 2:35 PM</div>
          </div>
        </div>
      </div>
    );
  }
}