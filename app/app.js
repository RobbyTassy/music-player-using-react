// ES6 Component
import React from 'react';
// Import React and ReactDOM
import ReactDOM from 'react-dom';
// Import Search component from app/components/search.component.js directory
import Search from './components/search.component';
// Import Details component from app/components/details.component.js directory
import Details from './components/details.component';
// Import Player component from app/components/player.component.js directory
import Player from './components/player.component';
// Import Progress component from app/components/progress.component.js directory
import Progress from './components/progress.component';

// Component Class

class App extends React.Component {
  // render method is most import
  // render method returns JSX template
  render() {
    return(
      <div>
      <Search />
      <Details title={'Track title'} />
      <Player />
      <Progress elapsed={'00:00'} position={'0.3'} total={'0:40'} />
      </div>
    );
  }
}

// Render to ID content in the DOM

ReactDOM.render( <App/ >, document.getElementById('content'));
