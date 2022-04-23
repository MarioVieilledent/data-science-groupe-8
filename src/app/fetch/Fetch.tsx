import React from 'react';
import httpService from '../http-service';
import './Fetch.scss';

class Fetch extends React.Component {
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      item: 'Content component',
      list: []
    }
  }

  testFetch() {

    httpService('https://api.archives-ouvertes.fr/search/', (data: any) => {
      console.log(data);
      let list: JSX.Element[] = [];
      data.response.docs.forEach((doc: Doc) => {
        list.push(
          <div className="block" key={doc.docid}>
            <h3>{doc.docid}</h3>
            <p>{doc.label_s}</p>
            <a href={doc.uri_s}>Link</a>
          </div>
        )
      });
      this.setState({
        list: list
      });
      console.log(this.state);
    });
  }

  render() {
    let list = this.state.list;

    return (
      <div className="fetch">
        <button onClick={() => this.testFetch()}>Fetch</button>
        <div className="list flex-col">
          {list}
        </div>
      </div>
    )
  }
}

interface Doc {
  docid: string;
  label_s: string;
  uri_s: string;
}

export default Fetch;