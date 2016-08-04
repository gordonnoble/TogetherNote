const NoteApiUtil = {
  updateNote(note, callback) {
    $.ajax({
      url: '/api/notes',
      method: 'POST',
      data: { note: note },
      success (note) {
        callback(note);
      }
    });
  }
};

module.exports = NoteApiUtil;
