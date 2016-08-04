json.array! @notebooks do |notebook|
  json.id notebook.id
  json.name notebook.name
  json.removable notebook.removable
  json.created_at notebook.created_at
  json.updated_at notebook.updated_at
end
