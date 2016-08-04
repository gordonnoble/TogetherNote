const Dispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const NoteApiUtil = require('../utils/note_api_util');

const NoteActions = {};

NoteActions.setCurrentNote = function(note) {
  Dispatcher.dispatch({
    actionType: NoteConstants.SET_CURRENT_NOTE,
    note: note
  });
};

NoteActions.updateNote = function(note) {
  NoteApiUtil.updateNote(note);
};

module.exports = NoteActions;
