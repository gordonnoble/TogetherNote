const React = require('react');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');

const AccountEdit = React.createClass({
  getInitialState() {
    return({ imageFile: null, imageUrl: null });
  },
  updateFile(event) {
    let file = event.currentTarget.files[0];
    let reader = new FileReader();

    reader.onloadend = function() {
      this.setState({ imageFile: file, imageUrl: reader.result });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: null, imageFile: null });
    }
  },
  submitImage(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("user[avatar]", this.state.imageFile);
    SessionActions.updateAvatar(formData);
    document.getElementById("account-edit").className = "hide";
  },
  render() {
    let buttonClass = (this.state.imageFile === null) ? "hide" : "show";

    return(
      <div id="account-edit">
        <div id="account-edit-box">
          <h1>Update Avatar</h1>

          <form id="account-edit-form" onSubmit={this.submitImage}>
            <label id="file-label">Choose Image
              <input id="file-input" type="file" onChange={this.updateFile} />
            </label>
            <button onClick={this.submitImage} id="image-upload-button" className={buttonClass}>Save</button>
          </form>

          <img src={this.state.imageUrl} id="avatar-preview"/>

        </div>
    </div>
    );
  }
});

module.exports = AccountEdit;
