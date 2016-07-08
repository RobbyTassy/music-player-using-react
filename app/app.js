// ES6 Component
import React from 'react';
// Import React and ReactDOM
import ReactDOM from 'react-dom';
// Import Container component
import AppContainer from './containers/app.container'

// Component Class

class App extends React.Component {
  // render method returns JSX template
  render() {
    return (
    <AppContainer />
    );
  }
}

// Render to index.html
ReactDOM.render( <App/ >, document.getElementById('content'));
