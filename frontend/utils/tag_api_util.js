const TagApiUtil = {
  fetchAll(user_id, callback) {
    $.ajax({
      url: `api/users/${user_id}/tags`,
      method: 'GET',
      success(tags) {
        callback(tags);
      }
    });
  }
};

module.exports = TagApiUtil;
