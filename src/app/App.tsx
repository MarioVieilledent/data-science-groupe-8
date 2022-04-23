import React from 'react';
import './App.scss';
import Home from './home/Home';
import About from './about/About';
import Fetch from './fetch/Fetch';
import FetchGoogleScholar from './fetchGoogleScholar/FetchGoogleScholar';
import NoMatch from './noMatch/NoMatch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

/**
 * Pour ajouter un page
 * 1) Répertoire dans /app qui contient un .tsx (avec export du component react) et un .scss
 * 2) Importer le component react ici
 * 3) Ajouter un élément dans la liste page: Pages[]
 */

const selectedColor = '#cf7417';
const localStoragePage = 'currentPage';

class App extends React.Component {

  state: any;

  pages: Page[] = [
    {
      component: Home,
      componentName: 'Home',
      path: '/'
    }, {
      component: About,
      componentName: 'About',
      path: 'about'
    }, {
      component: Fetch,
      componentName: 'Fetch',
      path: 'fetch'
    }, {
      component: FetchGoogleScholar,
      componentName: 'FetchGoogleScholar',
      path: 'fetchGoogleScholar'
    }
  ];

  constructor(props: any) {
    super(props);

    this.state = {
      selectedPage: ''
    }

    const cp = window.localStorage.getItem(localStoragePage);
    cp ? this.state.selectedPage = cp : this.state.selectedPage = this.pages[0].component;
  }

  selectNav(page: string) {
    window.localStorage.setItem(localStoragePage, page);
    this.setState({
      selectedPage: page
    });
  }

  render() {
    const navButtonList: JSX.Element[] = this.pages.map((page: Page) => {
      return (
        <div className="nav-button" key={page.componentName}>
          <Link
            style={{ 'backgroundColor': this.state.selectedPage === page.componentName ? selectedColor : '' }}
            className="nav-link flex"
            to={page.path}
            onClick={() => this.selectNav(page.componentName)}>{page.componentName}
          </Link>
        </div>
      );
    });
    const routeList: JSX.Element[] = this.pages.map((page: Page) => {
      return (
        <Route
          path={page.path}
          element={<page.component />}
          key={page.componentName}
        ></Route>
      );
    })
    return (
      <div className="app flex-col" >
        <Router>
          <div className="header flex">
            <nav className="nav flex">
              {navButtonList}
            </nav>
          </div>
          <div className="content">
            <Routes>
              {routeList}
              <Route path="*" element={<NoMatch />}></Route>
            </Routes>
          </div>
        </Router >
      </div >
    );
  }
}

interface Page {
  component: any,
  componentName: string,
  path: string
}

export default App;
