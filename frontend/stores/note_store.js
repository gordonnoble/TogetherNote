const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const NoteStore = new Store(Dispatcher);
const NoteConstants = require('../constants/note_constants');
const NotebookConstants = require('../constants/notebook_constants');

const _undefinedNote = { id: undefined, title: undefined, body: undefined, collaborators: undefined};
var _note = {};
var _taggedNotes = [];
var _dragNoteId;

NoteStore.switchNote = function(note) {
  _note = note;
  NoteStore.__emitChange();
};

NoteStore.updateNote = function(note) {
  _note = note;
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

NoteStore.setTaggedNotes = function(notes) {
  _taggedNotes = notes;
  NoteStore.__emitChange();
};

NoteStore.taggedNotes = function(notes) {
  return _taggedNotes.slice();
};

NoteStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case NoteConstants.SET_CURRENT_NOTE:
      NoteStore.switchNote(payload.note);
      break;
    case NoteConstants.NEW_NOTE:
      NoteStore.switchNote(payload.note);
      break;
    case NoteConstants.UPDATE_NOTE:
      NoteStore.updateNote(payload.note);
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
    case NoteConstants.RECEIVE_TAGGED_NOTES:
      NoteStore.setTaggedNotes(payload.notes);
      break;
  }
};

module.exports = NoteStore;
