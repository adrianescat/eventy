var React = require('react');
var ReactDOM = require('react-dom');

var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');

class EventNew extends React.Component{
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
  _handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.eventAdd;
    this.props.addEvent({title: form.title.value, description: form.description.value, created: Date.now()});
    // clear the form for the next input
    form.reset();
  }
  render() {
    return (
      <Panel className="panel-event" header="Add Event">
        <form name="eventAdd">
          <Input type="text" name="title" label="Title" />
          <Input type="text" name="description" label="Description" />
          <ButtonInput value="Add" bsStyle="primary" onClick={this._handleSubmit} />
        </form>
      </Panel>
    );
  }
}

module.exports = EventNew;