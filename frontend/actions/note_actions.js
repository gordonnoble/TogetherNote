const Dispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const NoteApiUtil = require('../utils/note_api_util');
const NotebookActions = require('./notebook_actions');

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
  NoteApiUtil.pushNote(note, NotebookActions.fetchNotebook);
};

NoteActions.newNote = function(notebookId) {
  NoteApiUtil.newNote(notebookId, NoteActions.appendToNotebookAndSetNewNote);
};

NoteActions.appendToNotebookAndSetNewNote = function(note) {
  Dispatcher.dispatch({
    actionType: NoteConstants.NEW_NOTE,
    note: note
  });
};

NoteActions.deleteNote = function(id) {
  NoteApiUtil.deleteNote(id, NoteActions.resetNotebookAndClearNote);
};

NoteActions.resetNotebookAndClearNote = function(note) {
  Dispatcher.dispatch({
    actionType: NoteConstants.DELETE_NOTE,
    note: note
  });
  // NotebookActions.fetchNotebooks();
};

NoteActions.startDrag = function(id) {
  Dispatcher.dispatch({
    actionType: NoteConstants.START_DRAG,
    id: id
  });
};

NoteActions.switchNotesNotebook = function(noteId, notebookId) {
  NoteApiUtil.switchNotesNotebook(noteId, notebookId, NotebookActions.updateAll);
};

module.exports = NoteActions;
