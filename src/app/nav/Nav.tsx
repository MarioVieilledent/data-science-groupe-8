import React from 'react';
import './Nav.scss';

class Nav extends React.Component {
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      item: 'Title'
    }
  }

  render() {
    return (
      <div className="Nav">
        <span>{this.state.item}</span>
      </div>
    )
  }
}

export default Nav;