/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { httpService } from '../http-service';
import localStorageService from '../localStoageService';
import './FetchHAL.scss';
import Moment from 'moment';

const entryPoints = {
  root: 'http://api.archives-ouvertes.fr/search',
  portailInstances: 'https://api.archives-ouvertes.fr/ref/instance'
}

const fl = [
  'abstract_s',
  'city_s',
  'conferenceEndDate_tdate',
  'conferenceStartDate_tdate',
  'country_s',
  'docid',
  'doiId_s',
  'halId_s',
  'instStructCountry_s',
  'keyword_s',
  'label_s',
  'language_s',
  'licence_s',
  'producedDate_tdate',
  'releasedDate_tdate',
  'scientificEditor_s',
  'serie_s',
  'structCountry_s',
  'title_s',
  'uri_s'
];

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
        rows: '100',
        fl: fl.join(',') // Champs à retourner
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
      this.setState({ scientificPublicationList: scientificPublicationList });
    });

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
  buildScientificPublicationList(list: any[]) {
    return list.map((doc: any) => {
      return (
        <div className="doc-elem flex" key={doc.docid}>
          <div className="A">
            {
              doc.structCountry_s ? <img title={doc.structCountry_s} src={require(`../../assets/flag-icons-main/flags/1x1/${doc.structCountry_s[0]}.svg`)} alt="Icône du pays d'origine de la publication scientifique" /> : (
                doc.instStructCountry_s ? <img title={doc.instStructCountry_s} src={require(`../../assets/flag-icons-main/flags/1x1/${doc.instStructCountry_s[0]}.svg`)} alt="Icône du pays d'origine de la publication scientifique" /> : ''
              )
            }
          </div>
          <div className="B flex-col">
            <div className="flex">
              <span className="doc-title">{doc.title_s[0]}</span>
            </div>
            <div className="flex">
              <div className="keywords flex">
                {
                  doc.keyword_s?.map((kw: string, index: number) => { return <span className="key-word" key={index}>{kw}</span> })
                }
              </div>
            </div>
            <div className="flex">
              <span className="release-date">{Moment(doc.releasedDate_tdate).format('MMMM YYYY')}</span>
            </div>
          </div>
          <div className="C flex-col">
            <a className="button" target="_blank" rel="noreferrer" href={doc.uri_s}>HAL</a>
            <a className="button" target="_blank" rel="noreferrer" href={`https://hal.archives-ouvertes.fr/${doc.halId_s}/document`}>PDF</a>
          </div>
        </div>
      )
    });
  }

  render() {
    return (
      <div className="container flex-col">
        <div className="search-div">
          <a href="https://api.archives-ouvertes.fr/docs/search" target="_blank" rel="noreferrer">API HAL</a>
          <input className="search-input" type="text" onChange={(e: any) => {
            this.setState((prev: any) => {
              const apiMaker = Object.assign({}, prev.apiMaker);
              apiMaker.q = e.target.value;
              return { apiMaker };
            })
          }} />
          <button className="search-button" onClick={() => { this.fetchHAL(); }}>Rechercher</button>
        </div>
        <div className="block flex-col">
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {
  portailInstancesList: JSX.Element[];
  scientificPublicationList: JSX.Element[];
  apiMaker: any;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props { }

export default FetchHAL;