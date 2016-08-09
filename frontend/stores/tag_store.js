const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');
const TagStore = new Store(Dispatcher);
const TagConstants = require('../constants/tag_constants');

var _tags = {};

TagStore.updateTags = function(tags) {
  _tags = tags;
  TagStore.__emitChange();
};

TagStore.all = function() {
  let tags = [];

  for(let key in _tags) {
    tags.push(_tags[key]);
  }

  return tags;
};

TagStore.addTag = function(tag) {
  _tags[tag.id] = tag;
  TagStore.__emitChange();
};

TagStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case TagConstants.RECEIVE_TAG:
      TagStore.addTag(payload.tag);
      break;
    case TagConstants.RECEIVE_TAGS:
      TagStore.updateTags(payload.tags);
      break;
  }
};

module.exports = TagStore;
