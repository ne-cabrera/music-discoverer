import React from "react";
import Comment from "./Comment";
export default class CommentList extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div >
        {this.props.comments.map((d, i) => (
          <Comment key={i} info={d} />
        ))}
      </div>

    );
  }

}