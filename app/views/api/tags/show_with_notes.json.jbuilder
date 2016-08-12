json.id @tag.id
json.type "tagbook"
json.name @tag.name
json.notes @notes
json.first_note do
  json.partial! "api/notes/note", note: @first_note
end
