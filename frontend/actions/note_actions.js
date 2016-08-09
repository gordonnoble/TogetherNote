const Dispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const NoteApiUtil = require('../utils/note_api_util');
const NotebookActions = require('./notebook_actions');
const TagConstants = require('../constants/tag_constants');

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
  NoteApiUtil.pushNote(note, NoteActions.updateNote);
};

NoteActions.silentPushNote = function(note) {
  NoteApiUtil.pushNote(note, () => console.log('shhhh'));
};

NoteActions.updateNote = function(note) {
  Dispatcher.dispatch({
    actionType: NoteConstants.UPDATE_NOTE,
    note: note
  });
};

NoteActions.newNote = function(notebookId) {
  NoteApiUtil.newNote(notebookId, NoteActions.receiveNewNote);
};

NoteActions.receiveNewNote = function(note) {
  Dispatcher.dispatch({
    actionType: NoteConstants.NEW_NOTE,
    note: note
  });

  document.querySelector('#note-header .title').select();
};

NoteActions.deleteNote = function(id) {
  NoteApiUtil.deleteNote(id, NoteActions.receiveDeletedNote);
};

NoteActions.receiveDeletedNote = function(note) {
  NotebookActions.fetchNotebooks();

  Dispatcher.dispatch({
    actionType: NoteConstants.DELETE_NOTE,
    note: note
  });
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

NoteActions.searchByTag = function(tagId) {
  NoteApiUtil.searchByTag(tagId, NoteActions. receiveTaggedNotes);
};

NoteActions.receiveTaggedNotes = function(tagNotebook) {
  Dispatcher.dispatch({
    actionType: NoteConstants.RECEIVE_TAGGED_NOTES,
    tagNotebook: tagNotebook
  });
};

module.exports = NoteActions;
