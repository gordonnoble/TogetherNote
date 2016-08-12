json.id note.id
json.title note.title
json.body note.body
json.plain_body note.plain_text_body
json.pictures do
  json.array! note.pictures do |picture|
    json.id picture.id
    json.image_url asset_path(picture.image.url(:original))
  end
end
json.collaborators do
  json.array! note.all_users, :id, :username
end
json.tags do
  json.array! note.tags, :name
end
