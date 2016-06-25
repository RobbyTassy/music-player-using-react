// ES6 Component
import React from 'react';
// Import React and ReactDOM
import ReactDOM from 'react-dom';
// Import Search component from app/components/search.component.js directory
import Search from './components/search.component';

// Component Class

class App extends React.Component {
  // render method is most import
  // render method returns JSX template
  render() {
    return(
      <Search />
    );
  }
}

// Render to ID content in the DOM

ReactDOM.render( <App/ >, document.getElementById('content'));
