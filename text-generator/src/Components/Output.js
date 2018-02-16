import React, { Component } from 'react';

var text = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'

class Output extends Component {
  copyText(o) {
    var output = o.map(p => {
      return p.props.children + '\r\n'
    }).join('')

    var textField = document.createElement('textarea')
    textField.innerText = output
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  render() {
    let outputList = [];
    for (var i = 0; i < this.props.paras; i++) {
      if (this.props.html === 'Yes') {
        outputList.push('<p>' + text.repeat(this.props.paras) + '</p>')
      } else {
        outputList.push(text.repeat(this.props.paras))
      }
    }

    let output = outputList.map(p => {
      return <p>{p}</p>
    })


    return (
      <div className="container">
        <div className="card text-white bg-secondary mb-3">
          <div style={{color: 'black'}} className="card-header">Output</div>
          <div className="card-body">
            <div style={{color: 'black'}} id="output" className="card-text">{output}</div>
            <button onClick={this.copyText.bind(this, output)} type="button" className="btn btn-primary" style={{float: 'right'}}>Copy</button>
          </div>
        </div>
    </div>
    )
  }
}

export default Output;
