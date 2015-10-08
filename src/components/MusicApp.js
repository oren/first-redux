import React, { Component } from 'react';
import { connect, dispatch } from 'react-redux';
import { addTrack, removeTrack, loadLibrary, playTrack, updateTime,
        togglePlay } from '../actions.js';

import AudioPlayer from './Player.js';
import Library from './Library';
import StatusBar from './StatusBar';

class MusicApp extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className='row' style={{margin: '50px'}}>
        <h1>music app</h1>
        <input type="button" value="Load Songs Library" onClick={() => dispatch(loadLibrary())} />
        <Library songs={this.props.library.songs}
                  onAddClick={trackinfo => dispatch(addTrack(trackinfo))} />

          <div className='col-md-8' style={{maxWidth: 400 +'px'}} >
            <AudioPlayer src={this.props.player.playing.url}
                          time={this.props.player.time}
                          duration={this.props.player.duration}
                          isPlaying={this.props.player.playing.currentlyPlaying}
                          togglePlay={(bool)=> dispatch(togglePlay(bool))}
                          updateTime={(currentTime, duration) => dispatch(updateTime(currentTime, duration))}
                          playlist={this.props.playlist}
                          onRemoveClick={trackinfo => dispatch(removeTrack(trackinfo))}
                          onPlayClick={trackinfo => dispatch(playTrack(trackinfo))}  />
          </div>
        <StatusBar libraryStatus={this.props.library.status} />
      </div>
    );
  }
}

function mapGlobalStateToProps(state) {
  return {
    library: state.library,
    playlist: state.playlist,
    player: state.player
  }
}

export default connect(mapGlobalStateToProps)(MusicApp);
