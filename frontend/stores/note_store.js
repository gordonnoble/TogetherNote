const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const NoteStore = new Store(Dispatcher);
const NoteConstants = require('../constants/note_constants');
const NotebookConstants = require('../constants/notebook_constants');

const _undefinedNote = { id: undefined, title: undefined, body: undefined, collaborators: undefined};
var _note = {};
var _dragNoteId;

NoteStore.setCurrentNote = function(note) {
  _note = note;
  NoteStore.__emitChange();
};

NoteStore.isEmpty = function() {
  return _note === _undefinedNote;
};

NoteStore.currentNote = function() {
  return Object.assign({}, _note);
};

NoteStore.wipeCurrentNote = function() {
  _note = _undefinedNote;
  NoteStore.__emitChange();
};

NoteStore.startDrag = function(id) {
  _dragNoteId = id;
};

NoteStore.dragNoteId = function() {
  return _dragNoteId;
};

NoteStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case NoteConstants.SET_CURRENT_NOTE:
      NoteStore.setCurrentNote(payload.note);
      break;
    case NoteConstants.NEW_NOTE:
      NoteStore.setCurrentNote(payload.note);
      break;
    case NoteConstants.DELETE_NOTE:
      NoteStore.wipeCurrentNote();
      break;
    case NotebookConstants.RECEIVE_NEW_NOTEBOOK:
      NoteStore.wipeCurrentNote();
      break;
    case NotebookConstants.REMOVE_NOTEBOOK:
      NoteStore.wipeCurrentNote();
      break;
    case NoteConstants.START_DRAG:
      NoteStore.startDrag(payload.id);
      break;
  }
};

module.exports = NoteStore;
