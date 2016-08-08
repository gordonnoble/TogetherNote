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
      data: { note: { title: "Title Here Please", body: "", notebookId: notebookId }},
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
      url: `/api/notes/${noteId}/tag`,
      method: 'PATCH',
      data: { tag: { name: tagName } },
      success(tags) {
        callback(tags);
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
  }
};

module.exports = NoteApiUtil;
