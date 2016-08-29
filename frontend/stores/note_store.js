const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const NoteStore = new Store(Dispatcher);
const NoteConstants = require('../constants/note_constants');
const NotebookConstants = require('../constants/notebook_constants');
const TagConstants = require('../constants/tag_constants');

const _undefinedNote = { id: undefined, title: undefined, body: undefined, collaborators: undefined};
var _note = {};
var _dragNoteId;

NoteStore.updateNote = function(note) {
  _note = note;
};

NoteStore.switchNote = function(note) {
  _note = note;
  NoteStore.__emitChange();
};

NoteStore.isEmpty = function() {
  return _note === _undefinedNote;
};

NoteStore.currentNote = function() {
  return Object.assign({}, _note);
};

NoteStore.startDrag = function(id) {
  if (_dragNoteId === undefined) {
    _dragNoteId = id;
  }
};

NoteStore.dragNoteId = function() {
  return _dragNoteId;
};

NoteStore.endDrag = function() {
  _dragNoteId = undefined;
};

NoteStore.setupNewNotebooks = function(notes) {
  _note = _undefinedNote;
  NoteStore.__emitChange();
};

NoteStore.removeNotebook = function() {
  _note = _undefinedNote;
  NoteStore.__emitChange();
};

NoteStore.deleteNote = function(note) {
  if (_note.id === note.id) {
    _note = _undefinedNote;
    NoteStore.__emitChange();
  }
};

NoteStore.switchBook = function(book) {
  _note = (book.first_note === undefined) ? (_undefinedNote) : (book.first_note);
  NoteStore.__emitChange();
};

NoteStore.addTag = function(tag) {
  _note.tags[tag.id] = tag;
  NoteStore.__emitChange();
};

NoteStore.removeTag = function(tag) {
  delete _note.tags[tag.id];
  NoteStore.__emitChange();
};

NoteStore.tags = function() {
  let tags = [];
  for(let key in _note.tags){
    tags.push(_note.tags[key]);
  }
  return tags;
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
      NoteStore.deleteNote(payload.note);
      break;
    case NoteConstants.START_DRAG:
      NoteStore.startDrag(payload.id);
      break;
    case NoteConstants.END_DRAG:
      NoteStore.endDrag();
      break;
    case NotebookConstants.RECEIVE_NEW_NOTEBOOK:
      NoteStore.switchBook(payload.notebook);
      break;
    case NotebookConstants.RECEIVE_EXISTING_NOTEBOOK:
      NoteStore.switchBook(payload.notebook);
      break;
    case NoteConstants.RECEIVE_TAGGED_NOTES:
      NoteStore.switchBook(payload.tagNotebook);
      break;
    case TagConstants.RECEIVE_TAG:
      NoteStore.addTag(payload.tag);
      break;
    case TagConstants.REMOVE_TAG:
      NoteStore.removeTag(payload.tag);
      break;
  }
};

module.exports = NoteStore;
