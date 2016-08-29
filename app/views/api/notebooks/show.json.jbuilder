json.id @notebook.id
json.type "notebook"
json.name @notebook.name
json.user_id @notebook.user_id
json.removable @notebook.removable
json.created_at @notebook.created_at
json.updated_at @notebook.updated_at
json.notes @notebook.notes_hash
json.first_note do
  if @notebook.first_note
    json.partial! "api/notes/note", note: @notebook.first_note
  else
    nil
  end
end
