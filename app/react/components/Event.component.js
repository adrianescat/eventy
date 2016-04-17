var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

class Event extends React.Component {
  _parseDate(stringDate){
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var date = new Date(stringDate);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return `${day} ${monthNames[monthIndex]} ${year}`;
  }
  render() {
    return (
      <article className="event">
        <div className="event__title">{this.props.event.title}</div>
      <span className="event__created">{this._parseDate(this.props.event.created)}</span>
        <p className="event__description">{this.props.event.description}</p>
        <br/>
        <div className="event__creator">{`by ${this.props.event.creator.fullName}`}</div>
      </article>
    );
  }
}

module.exports = Event;