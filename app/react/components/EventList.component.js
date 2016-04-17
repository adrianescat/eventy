var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Event = require('./Event.component');
var EventNew = require('./EventNew.component');

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {events: []};

    this._loadData = this._loadData.bind(this);
    this._addEvent = this._addEvent.bind(this);
  }
  componentDidMount() {
    this._loadData();
  }
  _addEvent(event) {
    $.ajax({
      type: 'POST', url: '/api/events', contentType: 'application/json',
      data: JSON.stringify(event),
      success: function(data) {
        var event = data;
        // We're advised not to modify the state, it's immutable. So, make a copy.
        var eventsModified = this.state.events;
        eventsModified.unshift(event);
        this.setState({events: eventsModified});
      }.bind(this),
      error: function(xhr, status, err) {
        // ideally, show error to user.
        console.log("Error adding event:", err);
      }
    });
  }
  _loadData() {
    $.ajax('/api/events').done(function(data) {
      this.setState({events: data});
    }.bind(this));
  }
  render() {
    let events = this.state.events.map(event => <Event key= {event._id} event= {event}/>);
    return (
      <div>
        <h1>Events</h1>
        <EventNew addEvent={this._addEvent}/>
        <div className="container events">
          {events}
        </div>
      </div>
    );
  }
}

module.exports = EventList;