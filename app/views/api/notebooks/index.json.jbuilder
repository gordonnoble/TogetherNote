json.array! @notebooks do |notebook|
  json.id notebook.id
  json.name notebook.name
  json.note_count notebook.note_count
  json.removable notebook.removable
  json.created_at notebook.created_at
  json.updated_at notebook.updated_at
end
