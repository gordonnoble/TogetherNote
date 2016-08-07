const React = require('react');
const DisplayStore = require('../../stores/display_store');
const NotebookActions = require('../../actions/notebook_actions');
const DisplayActions = require('../../actions/display_actions');

const NotebookForm = React.createClass({
  focus: false,

  getInitialState() {
    return({ name: "" });
  },
  componentDidMount() {
    this.listener = DisplayStore.addListener(this.toggleOpen);

    $(document).on('click', function(event) {
      if (!$(event.target).closest('#notebook-form').length) {
        DisplayActions.hideNotebookForm();
      }
    });
  },
  componentWillUnmount() {
    this.listener.remove();
  },
  handleInput(event){
    let newState = {};
    newState[event.target.className] = event.target.value;
    this.setState(newState);
  },
  submit(event){
    event.preventDefault();
    NotebookActions.createNotebook(this.state);
    DisplayActions.hideNotebookForm();
    DisplayActions.closeDrawer();
    this.setState({ name: "" });
  },
  toggleOpen() {
    let form = document.getElementById("notebook-form");

    if (DisplayStore.isNotebookFormVisible()) {
      form.className = "notebook-index-item on";
      document.getElementById("notebook-form-input").focus();
    } else {
      form.className = "notebook-index-item off";
    }
  },
  close() {
    DisplayActions.hideNotebookForm();
  },
  render() {
    return(
      <li id="notebook-form" className="notebook-index-item off">
        <form onSubmit={this.submit}>
          <input id="notebook-form-input" className="name" type="text" value={this.state.name} onChange={this.handleInput} />
          <span id="notebook-form-button">Create</span>
        </form>
      </li>
    );
  }
});

module.exports = NotebookForm;
