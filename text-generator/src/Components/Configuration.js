import React, { Component } from 'react';

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras: 4,
      html: 'Yes',
      text: ''
    }
  }

  changeHTMLSelect(event) {
    this.setState({html: event.target.value});
    this.props.setHTML(event.target.value);
  }

  changeParas(event) {
    this.setState({paras: event.target.value});
    this.props.setParas(event.target.value);
  }

  render() {
    return (
      <div className="container">
        <div className="card text-white bg-primary mb-3" style={{marginTop: 20}}>
          <div className="card-header">Configuration</div>
          <div className="card-body">
              <form className="row">
                <div className="col-sm">
                  <label htmlFor="exampleInputEmail1">Number of Paragraphs</label>
                  <input className="form-control" style={{color: 'white'}} value={this.state.paras} onChange={this.changeParas.bind(this)} type="number" min="0"/>
                </div>
                <div className="col-sm form-group">
                  <label htmlFor="exampleSelect1">Show HTML</label>
                  <select onChange={this.changeHTMLSelect.bind(this)} value={this.state.html} style={{color: 'white'}} className="form-control" id="exampleSelect1">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Configuration;
