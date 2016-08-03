json.name @notebook.name
json.user_id @notebook.user_id
json.removable @notebook.removable
json.notes do
  json.array! @notebook.notes do |note|
    json.id note.id
    json.title note.title
    json.body note.body
  end
end
