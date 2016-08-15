const NoteApiUtil = {
  fetchNote(id, callback) {
    $.ajax({
      url: `/api/notes/${id}`,
      method: 'GET',
      success(note) {
        callback(note);
      }
    });
  },

  pushNote(note, callback) {
    $.ajax({
      url: `/api/notes/${note.id}`,
      method: 'PATCH',
      data: { note: note },
      success(note) {
        callback(note);
      }
    });
  },

  newNote(notebookId, callback) {
    $.ajax({
      url: '/api/notes',
      method: 'POST',
      data: { note: { title: "", body: "", notebookId: notebookId }},
      success(note) {
        callback(note);
      }
    });
  },

  deleteNote(id, callback) {
    $.ajax({
      url: `/api/notes/${id}`,
      method: 'DELETE',
      success(note) {
        callback(note);
      }
    });
  },

  switchNotesNotebook(noteId, notebookId, callback) {
    $.ajax({
      url: `/api/notes/${noteId}/switch`,
      method: 'PATCH',
      data: { notebook: { id: notebookId } },
      success() {
        callback();
      }
    });
  },

  tagNote(noteId, tagName, callback) {
    $.ajax({
      url: `/api/notes/${noteId}/tags`,
      method: 'POST',
      data: { tag: { name: tagName } },
      success(tags) {
        callback(tags);
      }
    });
  },

  unTagNote(noteId, tag, callback) {
    $.ajax({
      url: `/api/notes/${noteId}/tags`,
      method: 'DELETE',
      data: { tag: tag },
      success(tag) {
        callback(tag);
      }
    });
  },

  searchByTag(tagId, callback) {
    $.ajax({
      url: `/api/tags/${tagId}/notes`,
      method: 'GET',
      success(notes) {
        callback(notes);
      }
    });
  },

  shareNote(noteId, username) {
    $.ajax({
      url: `/api/notes/${noteId}/users`,
      method: 'POST',
      data: { user: { username: username } },
    });
  }
};

module.exports = NoteApiUtil;
