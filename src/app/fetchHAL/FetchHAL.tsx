import React from 'react';
import httpService from '../http-service';
import localStorageService from '../localStoageService';
import './FetchHAL.scss';

const entryPoints = {
  root: 'http://api.archives-ouvertes.fr/search',
  portailInstances: 'https://api.archives-ouvertes.fr/ref/instance'
}

class FetchHAL extends React.Component<Props, State>{

  state: Readonly<State>;

  constructor(props: Props) {
    super(props);

    // Création de l'objet state de type State
    this.state = {
      portailInstancesList: [],
      scientificPublicationList: [],
      apiMaker: {
        q: '*',
        wt: 'json',
        rows: '100'
      }
    }

    // Au démarrage, récupère la liste des instances
    this.fetchPortailInstances = this.fetchPortailInstances.bind(this);
  }

  /**
   * Une fois la construction de props et state terminée, récupération des éléments nécessaires
   */
  componentDidMount() {
    this.fetchPortailInstances();
  }

  /**
   * Récupère (en ligne ou en localStorage) la liste des instances de portail
   */
  fetchPortailInstances(): void {
    let portailInstancesList: JSX.Element[] = [];

    const ls = window.localStorage.getItem(localStorageService.portailInstancesList);

    if (ls) {
      portailInstancesList = this.buildProtailInstanceList(JSON.parse(ls));
    } else {
      httpService(entryPoints.portailInstances, (data: any) => {
        portailInstancesList = this.buildProtailInstanceList(data.response.docs);
        window.localStorage.setItem(localStorageService.portailInstancesList, JSON.stringify(data.response.docs));
      });
    }

    this.setState({ portailInstancesList: portailInstancesList });
  }

  /**
   * Compile les éléments de state.apiMaker pour créer l'URL
   */
  buildUrl(): string {
    let url = entryPoints.root + '?';
    const list = []
    for (const [key, value] of Object.entries(this.state.apiMaker)) {
      list.push(key + '=' + value);
    }
    url += list.join('&');
    return url;
  }

  /**
   * Constuit l'url et effectue une recherche ur l'API de HAL
   */
  fetchHAL(): void {
    let scientificPublicationList: JSX.Element[] = [];
    const url = this.buildUrl();

    httpService(url, (data: any) => {
      console.log(data.response.docs)
      scientificPublicationList = this.buildScientificPublicationList(data.response.docs);
    });

    this.setState({ scientificPublicationList: scientificPublicationList });
  }

  /**
   * Construit la liste JSX.Element des instances de portail
   */
  buildProtailInstanceList(list: Doc[]) {
    return list.map((doc: Doc) => {
      return (
        <div className="doc-elem flex" key={doc.code}>
          <button title="Tester instance de portail" className="code">{doc.code}</button>
          <a className="url" href={doc.url}>Link</a>
          <span className="name">{doc.name}</span>
        </div>
      )
    });
  }

  /**
   * Construit la liste JSX.Element des instances de portail
   */
  buildScientificPublicationList(list: ScientificPublication[]) {
    return list.map((doc: ScientificPublication) => {
      return (
        <div className="doc-elem flex" key={doc.docid}>
          <button title="Ouvrir document" className="code">{doc.label_s}</button>
          <a className="url" href={doc.uri_s}>Link</a>
        </div>
      )
    });
  }

  render() {
    return (
      <div className="container flex-col">
        <a href="https://api.archives-ouvertes.fr/docs/search" target="_blank" rel="noreferrer">API HAL</a>
        <div className="search-div">
          <input className="search-input" type="text" onChange={(e: any) => {
            this.setState((prev: any) => {
              const apiMaker = Object.assign({}, prev.apiMaker);
              apiMaker.q = e.target.value;
              return { apiMaker };
            })
          }} />
          <button onClick={() => { this.fetchHAL(); }}>Rechercher</button>
        </div>
        <div className="block flex-col">
          <span className="title-description">Instances de portail</span>
          <div className="portail-instances-list flex-col">
            {this.state.portailInstancesList}
          </div>
        </div>
        <div className="block flex-col">
          <span className="title-description">Résultat de recherche</span>
          <div className="scientific-publication-list flex-col">
            {this.state.scientificPublicationList}
          </div>
        </div>
      </div>
    )
  }
}

interface Doc {
  code: string;
  id: string;
  name: string;
  url: string;
}

interface ScientificPublication {
  docid: string;
  label_s: string;
  uri_s: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {
  portailInstancesList: JSX.Element[];
  scientificPublicationList: JSX.Element[];
  apiMaker: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props { }

export default FetchHAL;