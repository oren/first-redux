import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ProgressBar extends React.Component{
  handleClick(e){
    //calculate the new position...
    let duration = Math.floor(this.props.duration);
    let position = e.nativeEvent.offsetX;
    let barWidth = ReactDOM.findDOMNode(this.refs.pbar).clientWidth;
    let newPosition = duration * ( position / barWidth );
    // and send it off to the parent for updating the AUDIO element
    this.props.progressBarClick(newPosition);
  }

  render(){
    let elapsed = Math.floor((Math.floor(this.props.time) / Math.floor(this.props.duration)) * 100);

    return <div>
            <h2>The current elapsed time is: {elapsed} </h2>
            <div className="progress" onClick={this.handleClick.bind(this)} ref='pbar'>
              <div className="progress-bar" role="progressbar" aria-valuenow={elapsed}
                    aria-valuemin="0" aria-valuemax="100" style={{width: elapsed + '%' }}>
                <span className="sr-only"></span>
              </div>
            </div>
          </div>
  }
}

export default class Controls extends React.Component {

  componentDidUpdate(prevProps){
    if (this.props.player.playing.key !== prevProps.player.playing.key){
      let playerElement = ReactDOM.findDOMNode(this.refs.player);
      playerElement.load();
      playerElement.play();
    }
  }

  componentDidMount() {
    let playerElement = ReactDOM.findDOMNode(this.refs.player);

    playerElement.addEventListener('playing', this.togglePlay.bind(this, true));
    playerElement.addEventListener('pause', this.togglePlay.bind(this, false));
    playerElement.addEventListener('timeupdate', this.audioUpdate.bind(this, playerElement));
    // playerElement.addEventListener('loadedmetadata', this.newTrackLoaded);
    // playerElement.addEventListener('canplay', this.audioReady);
    // playerElement.addEventListener('ended', this.audioEnded);
  }
  newTrackLoaded(){
    console.log('new track loads');
    let playerElement = ReactDOM.findDOMNode(this.refs.player);
    this.props.setDuration(playerElement.duration)
  }
// just put this method straight into the event handler?
  togglePlay(bool){
    this.props.togglePlay(bool);
  }
  audioUpdate(playerElement) {
    if (Math.floor(playerElement.currentTime) !== this.props.player.time){
      this.props.updateTime(playerElement.currentTime);
    }
  }
  playAudio(){
    let playerElement = ReactDOM.findDOMNode(this.refs.player);
    if ( this.props.player.playing.currentlyPlaying )
      {
        playerElement.pause();
      }
    else {
      playerElement.load();
      playerElement.play();
    }
  }

  progressBarClick(newPosition) {
/////////////////////////////////////////////////////////
// THIS REALLY BOTHERS ME BUT I CAN'T FIGURE OUT HOW TO BIND THIS PROPERLY
////////////////////////////////////////////////////////////
    let playerElement = document.getElementById('player');
    playerElement.currentTime = Math.floor(newPosition);
  }

  render(){
    let play = <i className='fa fa-play'></i>;
    let pause = <i className='fa fa-pause'></i>;

    return (
      <div>
        <audio onLoadedMetadata={this.newTrackLoaded.bind(this)}
              ref='player' id='player' controls >
          <source src={this.props.player.playing.url} />
        </audio>
      </div>
    );
  }
}
