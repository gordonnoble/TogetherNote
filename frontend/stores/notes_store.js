const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const NotesStore = new Store(Dispatcher);
const NoteConstants = require('../constants/note_constants');
const NotebookConstants = require('../constants/notebook_constants');


var _notes = {};
var _header = "";
var _bookType = "";

NotesStore.updateNotes = function(book) {
  _notes = book.notes;
  _header = book.name;
  _bookType = book.type;
  NotesStore.__emitChange();
};

NotesStore.header = function() {
  return _header;
};

NotesStore.bookType = function() {
  return _bookType;
};

NotesStore.updateNote = function(note) {
  _notes[note.id] = { id: note.id, title: note.title, body: note.plain_body };
  NotesStore.__emitChange();
};

NotesStore.allNotes = function() {
  let notes = [];

  for(let key in _notes) {
    notes.push(_notes[key]);
  }

  return notes;
};

NotesStore.deleteNote = function(note) {
  delete _notes[note.id];
  NotesStore.__emitChange();
};


NotesStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case NotebookConstants.RECEIVE_NEW_NOTEBOOK:
      NotesStore.updateNotes(payload.notebook);
      break;
    case NotebookConstants.RECEIVE_EXISTING_NOTEBOOK:
      NotesStore.updateNotes(payload.notebook);
      break;
    case NoteConstants.NEW_NOTE:
      NotesStore.updateNote(payload.note);
      break;
    case NoteConstants.UPDATE_NOTE:
      NotesStore.updateNote(payload.note);
      break;
    case NoteConstants.DELETE_NOTE:
      NotesStore.deleteNote(payload.note);
      break;
    case NoteConstants.RECEIVE_TAGGED_NOTES:
      NotesStore.updateNotes(payload.tagNotebook);
      break;
  }
};

module.exports = NotesStore;
