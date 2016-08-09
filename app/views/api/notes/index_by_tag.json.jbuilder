json.name @tag.name
json.notes do
  json.array! @notes do |note|
    json.id note.id
    json.title note.title
    json.body note.plain_text_body
  end
end
