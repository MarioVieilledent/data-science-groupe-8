import React from 'react';
import './App.scss';
import Content from './content/Content';
import Nav from './nav/Nav';

class App extends React.Component {
  render() {
    return (
      <div className="App" >
        <div className="header">
          <Nav />
        </div>
        <div className="content">
          <Content />
        </div>
      </div>
    );
  }
}

export default App;
