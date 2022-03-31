import React from 'react';
import './App.css';

class ClassDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log("componentDidMount");

    this.setState({ count: this.state.count + 1 }); // +1
    console.log(this.state.count); // 0
    this.setState({ count: this.state.count + 1 }); // +1
    console.log(this.state.count); // 0
    this.setState({ 
      count: this.state.count + 2  // 
    });
  }

  increment = () => {
    console.log("increment");
    this.setState({ count: this.state.count + 1 });
    // console.log(this.state.count);  // 3
    // this.setState({ count: this.state.count + 1 });
    // console.log(this.state.count);  // 3
  };

  render() {
    console.log("render");
    return <div onClick={this.increment} className="count">
          {this.state.count}
      </div>;
  }
}

export default ClassDemo;
