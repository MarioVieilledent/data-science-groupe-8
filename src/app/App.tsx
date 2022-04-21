import React from 'react';
import './App.scss';
import About from './about/About';
import Fetch from './fetch/Fetch';
import NoMatch from './noMatch/NoMatch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="app flex-col" >
        <Router>
          <div className="header flex">
            <nav className="nav flex">
              <div className="nav-button">
                <Link className="nav-link flex" to="/">Home</Link>
              </div>
              <div className="nav-button">
                <Link className="nav-link flex" to="/about">About</Link>
              </div>
              <div className="nav-button">
                <Link className="nav-link flex" to="/fetch">Fetch</Link>
              </div>
            </nav>
          </div>
          <div className="content">
            <Routes>
              <Route path="/" element={<About />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/fetch" element={<Fetch />}></Route>
              <Route path="*" element={<NoMatch />}></Route>
            </Routes>
          </div>
        </Router >
      </div >
    );
  }
}

export default App;
