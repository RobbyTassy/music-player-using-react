import React from 'react';

import Axios from 'axios';

// Exposes common sound APSs like: play, pause, stop
import Sounds from 'react-sound';

class AppContainer extends React.Container {

  // App container constructor
  constructor(props) {
    super(props);
    this.client_id = 'YOUR_CLIENT_ID'
    this.state ={
      track: {stream_url: '', title: '', artwork_url: ''},
      playStatus: Sound.status.STOPPED,
      elapsed: '00:00',
      total: '00:00',
      position: 0
    }
  }

  // Called once a component is loaded
  componentDidMount() {
    this.randomTrack
  }

  handleSongPlaying(audio) {
    this.setState({
      elapsed: this.formatMillisecnonds(audio.position),
      total: this.formatMillisecnonds(audio.duraton),
      position: audio.position / audio.duration
    })
  }

  // url: Stream URL of the sound. Attaches the client id to the URL
  prepareUrl(url) {
    return `${url}?client_id=${this.client_id}`
  }

  // Render method
  render() {
    return(
      <div className="scotch-music">
        url={this.prepareUrl(this.state.track.stream_url)}
        playStatus={this.state.playStatus}
        onPlaying={this.handleSongPlaying.bind(this)}
        playFromPosition={this.state.playFromPosition}
        onFinishedPlaying={this.handleSongFinished.bind(this)}
      </div>
    );
  }
}

export default AppContainer
