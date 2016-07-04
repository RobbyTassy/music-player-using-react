import React from 'react';
import Search from '../components/search.component'
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
      position: 0,
      playFromPosition: 0,
      autoCompleteValue: '',
      tracks: []
    };
  }

  // Called once a component is loaded
  componentDidMount() {
    this.randomTrack
  }

  // url: Stream URL of the sound. Attaches the client id to the URL
  prepareUrl(url) {
    return `${url}?client_id=${this.client_id}`
  }

  formatMillisecnonds(milliseconds) {
    // Format hours
    var hours = Math.floor(milliseconds / 3600000);
    milliseconds = milliseconds % 3600000

    // Format minutes
    var minutes = Math.floor(milliseconds / 60000)
    milliseconds = milliseconds % 600000;

    // Format seconds
    var seconds = Math.floor(milliseconds / 1000);
    milliseconds = milliseconds(milliseconds % 1000);

    // Return as string
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  handleSongPlaying(audio) {
    this.setState({
      elapsed: this.formatMillisecnonds(audio.position),
      total: this.formatMillisecnonds(audio.duraton),
      position: audio.position / audio.duration
    })
  }

  handleSongFinished() {
    this.randomTrack
  }


  // Render method
  render() {
    return(
      <div className="scotch-music">
      <Search
      autoCompleteValue={this.state.autoCompleteValue}
      tracks={this.state.tracks}
      handleSelect={this.handleSelect.bind(this)}
      handleChange={this.handleChange.bind(this)} />

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
