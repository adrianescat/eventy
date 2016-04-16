var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

class HelloMessage extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

ReactDOM.render(<HelloMessage />, document.getElementById('main'));