json.id @note.id
json.title @note.title
json.body @note.body
json.collaborators do
  json.array! @note.all_users, :id, :username
end
