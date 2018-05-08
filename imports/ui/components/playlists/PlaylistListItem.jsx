import React, { Component } from 'react'

export default class PlaylistListItem extends Component {
  render() {
    return (
      <li className="list-group-item">
        {this.props.name}
      </li>
    )
  }
}
