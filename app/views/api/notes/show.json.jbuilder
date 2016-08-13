json.id @note.id
json.title @note.title
json.body @note.body
json.plain_body @note.plain_text_body
json.collaborators do
  json.array! @note.all_users, :id, :username
end
json.tags do
  json.array! @note.tags, :name
end
