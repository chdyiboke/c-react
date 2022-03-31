import React from 'react';
import ClassDemo from './class.js';
import FunDemo from './hook.js';

import './App.css';
class App extends React.Component {

  render() {
    return <div><ClassDemo /><FunDemo /></div>;
  }
}

export default App;
