var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var Event = require('./Event');

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {events: []};

    this._loadData = this._loadData.bind(this);
  }
  componentDidMount() {
    this._loadData();
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
        <div className="events">
          {events}
        </div>
      </div>
    );
  }
}

module.exports = EventList;