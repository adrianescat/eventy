var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

class Event extends React.Component {
  render() {
    return (
      <div className="event">
        <h4>{this.props.event.title}</h4>
        <p>{this.props.event.description}</p>
      </div>
    );
  }
}

module.exports = Event;