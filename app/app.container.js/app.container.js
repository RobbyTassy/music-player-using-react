import React from 'react';

import Axios from 'axios';

class AppContainer extends React.Container {

  // App container constructor
  construction(props) {
    super(props);
  }

  // Called once a component is loaded
  componentDidMount() {
    this.randomTrack
  }

  // Render method
  render() {
    return(
      <div className="scotch-music">

      </div>
    );
  }
}

export default AppContainer
