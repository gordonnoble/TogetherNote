const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const NoteStore = new Store(Dispatcher);
const NoteConstants = require('../constants/note_constants');

var _note = {};

NoteStore.setCurrentNote = function(note) {
  _note = note;
  NoteStore.__emitChange();
};

NoteStore.currentNote = function() {
  return Object.assign({}, _note);
};

NoteStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case NoteConstants.SET_CURRENT_NOTE:
      NoteStore.setCurrentNote(payload.note);
      break;
  }
};

module.exports = NoteStore;
