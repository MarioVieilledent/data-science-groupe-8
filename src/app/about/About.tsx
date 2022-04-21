import React from 'react';
import './About.scss';

class About extends React.Component {
  state: any;

  constructor(props: any) {
    super(props);
    this.state = {
      item: 'Title'
    }
  }

  render() {
    return (
      <div className="about flex-col">
        <span>{this.state.item}</span>
      </div>
    )
  }
}

export default About;