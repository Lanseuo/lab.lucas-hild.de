import React, { Component } from 'react';
import './App.css';
import Configuration from './Components/Configuration'
import Output from './Components/Output'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras: 4,
      html: 'Yes',
      text: ''
    }
  }

  changeHTML(v) {
    this.setState({html: v})
  }

  changeParas(v) {
    this.setState({paras: v});
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="#">ReactJS TextGenerator</a>
        </nav>

        <Configuration setHTML={this.changeHTML.bind(this)} setParas={this.changeParas.bind(this)}/>

        <Output paras={this.state.paras} html={this.state.html}/>

      </div>
    );
  }
}

export default App;
