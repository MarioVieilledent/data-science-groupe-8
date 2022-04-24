import React from 'react';
import './App.scss';
import Home from './home/Home';
import About from './about/About';
import Fetch from './fetch/Fetch';
import FetchGoogleScholar from './fetchGoogleScholar/FetchGoogleScholar';
import FetchHAL from './fetchHAL/FetchHAL';
import NoMatch from './noMatch/NoMatch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import localStorageService from './localStoageService';

/**
 * Pour ajouter un page
 * 1) Répertoire dans /app qui contient un .tsx (avec export du component react) et un .scss
 * 2) Importer le component react ici
 * 3) Ajouter un élément dans la liste page: Pages[]
 */

const selectedColor = '#cf7417';

class App extends React.Component<Props, State>{

  state: Readonly<State>;

  constructor(props: Props) {
    super(props);

    // Création de l'objet state de type State
    this.state = {
      selectedPage: window.localStorage.getItem(localStorageService.currentPage) || '/',
      pages: [
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
        }, {
          component: FetchHAL,
          componentName: 'FetchHAL',
          path: 'fetchHAL'
        }
      ]
    };
  }

  selectNav(page: string): void {
    window.localStorage.setItem(localStorageService.currentPage, page);
    this.setState({
      selectedPage: page
    });
  }

  render(): JSX.Element {
    const state: Readonly<State> = this.state;
    const navButtonList: JSX.Element[] = state.pages.map((page: Page) => {
      return (
        <div className="nav-button" key={page.componentName}>
          <Link
            style={{ 'backgroundColor': state.selectedPage === page.componentName ? selectedColor : '' }}
            className="nav-link flex"
            to={page.path}
            onClick={() => this.selectNav(page.componentName)}>{page.componentName}
          </Link>
        </div>
      );
    });
    const routeList: JSX.Element[] = state.pages.map((page: Page) => {
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

interface State {
  selectedPage: string;
  pages: Page[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props { }

interface Page {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
  componentName: string;
  path: string;
}

export default App;
