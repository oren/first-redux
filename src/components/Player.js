import React, { Component } from 'react';
import Playlist from './Playlist';
import Controls from './Controls';

export default class AudioPlayer extends React.Component {

  render(){
    var style = {
        color: 'green',
        textAlign: 'center'
    };

    return (
      <div className='col-md-8' style={{maxWidth: 400 +'px'}} >
        <Controls player={this.props.player}
                  togglePlay={this.props.togglePlay}
                  audioUpdate={this.props.audioUpdate}
                  updateTime={this.props.updateTime}
                  setDuration={this.props.setDuration} />
        <h2 style={style}>Playlist</h2>
        <Playlist playlist={this.props.playlist}
                  currentTrack={this.props.player.playing.key}
                  onRemoveClick={this.props.onRemoveClick}
                  onPlayClick={this.props.onPlayClick} />
      </div>
    );
  }
}
