const React = require('react');
const DisplayStore = require('../../stores/display_store');
const NotebookActions = require('../../actions/notebook_actions');
const DisplayActions = require('../../actions/display_actions');

const NotebookForm = React.createClass({
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
    this.setState({ name: "" });
  },
  toggleOpen() {
    let form = document.getElementById("notebook-form");
    let note = document.getElementsByClassName("note");

    if (DisplayStore.isNotebookFormVisible()) {
      form.className = "on";
    } else {
      form.className = "off";
    }
  },
  close() {
    DisplayActions.hideNotebookForm();
  },
  render() {
    return(
      <div id="notebook-form" className="off">
        <button onClick={this.close}><img className="x-out" src={window.xOut} /></button>
        <form onSubmit={this.submit}>
          <h2>Notebook Name:</h2>
          <input type="text" className="name" value={this.state.name} onChange={this.handleInput} />
          <button>Create</button>
        </form>
      </div>
    );
  }
});

module.exports = NotebookForm;
