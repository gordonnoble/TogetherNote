const Dispatcher = require('../dispatcher/dispatcher');
const NoteApiUtil = require('../utils/note_api_util');
const TagStore = require('../stores/tag_store');
const TagConstants = require('../constants/tag_constants');
const TagApiUtil = require('../utils/tag_api_util');

const TagActions = {};

TagActions.tagNote = function(noteId, tagName) {
  NoteApiUtil.tagNote(noteId, tagName, TagActions.receiveTag);
};

TagActions.receiveTag = function(tag) {
  Dispatcher.dispatch({
    actionType: TagConstants.RECEIVE_TAG,
    tag: tag
  });
};

TagActions.fetchAll = function() {
  TagApiUtil.fetchAll(SessionStore.currentUser().id, TagActions.receiveAll);
};

TagActions.receiveAll = function(tags) {
  Dispatcher.dispatch({
    actionType: TagConstants.RECEIVE_TAGS,
    tags: tags
  });
};

module.exports = TagActions;
