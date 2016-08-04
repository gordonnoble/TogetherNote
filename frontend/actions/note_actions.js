const Dispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const NoteApiUtil = require('../utils/note_api_util');

const NoteActions = {};

NoteActions.fetchNote = function(id) {
  NoteApiUtil.fetchNote(id, NoteActions.setCurrentNote);
};

NoteActions.setCurrentNote = function(note) {
  Dispatcher.dispatch({
    actionType: NoteConstants.SET_CURRENT_NOTE,
    note: note
  });
};

NoteActions.pushNote = function(note) {
  NoteApiUtil.pushNote(note);
};

module.exports = NoteActions;
