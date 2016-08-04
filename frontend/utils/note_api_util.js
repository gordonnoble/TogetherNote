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

  pushNote(note) {
    $.ajax({
      url: `/api/notes/${note.id}`,
      method: 'PATCH',
      data: { note: note }
    });
  }
};

module.exports = NoteApiUtil;
