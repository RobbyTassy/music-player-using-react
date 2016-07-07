
// React library
import React from 'react';

// Axios for Ajax
import Axios from 'axios';

// Sound componen: exposes common sound APIs like: play, pause, stop
import Sound from 'react-sound';

// Custom component
import Search from '../components/search.component';
import Details from '../components/details.component';
import Player from '../components/player.component';
import Progress from '../components/progress.component';
import Footer from '../components/footer.component';


class AppContainer extends React.Container {

  // App container constructor
  constructor(props) {
    super(props);
    this.client_id = 'YOUR_CLIENT_ID'
    this.state ={
      track: {
        stream_url: '',
        title: '',
        artwork_url: ''
      },
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

  handleChange(value, item) {

    // Update input search box
    this.setState({autoCompleteValue: value, track: item});
    let _this = this;

    // Search for song with entered value
    Axios.get(`https://api.soundcloud.com/tracks?client_id=${this.client_id}&q=${value}`)
    .then(function (response) {
      // Update the track state
      _this.setState({tracks: response.data});
    })
    .catch(function (err) {
      console.log(err);
    });

  }

  // url: Stream URL of the sound.
  // Attaches the client id to the URL
  prepareUrl(url) {
    // Attach client id to stream url
    return `${url}?client_id=${this.client_id}`
  }

  xlArtwork(url){
    return url.replace(/large/, 't500x500')
  }

  formatMilliseconds(milliseconds) {
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

  togglePlay() {
    // Check current playing state
    if(this.state.playStatus === Sound.status.PLAYING){
      // Pause if playing
      this.setState({playStatus: Sound.status.PAUSED})
    } else {
      // Resume if paused
      this.setState({playStatus: Sound.status.PLAYING})
    }

    stop() {
      this.setState({playStatus: Sound.status.STOPPED});
    }

    forward() {
      this.setState({playFromPosition: this.state.playFromPosition+=1000*10});
    }

    backward() {
      this.setState({playFromPosition: this.state.playFromPosition-=1000*10});
    }

    handleSelect() {
      this.setState({ autoCompleteValue: value, track: item});
    }

  }


  // Render method
  render() {

    const scotchStyle = {
      width: '500px',
      height: '500px',
      backgroundImage: `linear-gradient(
        rgba(0, 0, 0, 0.7),
        rgba(0, 0, 0, 0.7)
      ), url(${this.xlArtwork(this.state.track.artwork_url)})`
    }

    return(
      <div className="scotch-music" style={scotchStyle}>
      <Search
      autoCompleteValue={this.state.autoCompleteValue}
      tracks={this.state.tracks}
      handleSelect={this.handleSelect.bind(this)}
      handleChange={this.handleChange.bind(this)} />
      <Details
      title={this.state.track.title} />
      <Player
      togglePlay={this.togglePlay.bind(this)}
      stop={this.stop.bind(this)}
      playStatus={this.state.playStatus}
      forward={this.forward.bind(this)}
      backward={this.backward.bind(this)}
      random={this.randomTrack.bind(this)} />
       <Progress
       elapsed={this.state.elapsed}
       total={this.state.total}
       position={this.state.position} />

        url={this.prepareUrl(this.state.track.stream_url)}
        playStatus={this.state.playStatus}
        onPlaying={this.handleSongPlaying.bind(this)}
        playFromPosition={this.state.playFromPosition}
        onFinishedPlaying={this.handleSongFinished.bind(this)}
        <Footer />
      </div>
    );
  }
}

export default AppContainer
