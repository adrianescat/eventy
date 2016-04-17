var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var EventList = require('./components/EventList.component');

ReactDOM.render(<EventList />, document.getElementById('main'));