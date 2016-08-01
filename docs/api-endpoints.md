# API Endpoints

## HTML API

### Root
- `GET /` - loads React web app

## JSON API

### Users
- `POST /api/users` - creates a new user
- `PATCH /api/users` - updates a user's information

### Session
- `POST /api/session` - logs a user in
- `DELETE /api/session` - logs a user out

### Notebooks
- `GET /api/notebooks` - get index of all notebooks
- `POST /api/notebooks` - create a new notebook
- `PATCH /api/notebooks/:id` - update a notebook's title
- `GET /api/notebooks/:id` - get all of a notebook's notes
- `DELETE /api/notebooks/:id` - delete a notebook

### Notes
- `GET /api/notes/:id` - get a note's detail
- `POST /api/notes` - create a new note
- `PATCH /api/notes/:id` - update a note's title and body
- `DELETE /api/notes/:id` - delete a note

### Tags
- `GET /api/tags` - search results are filtered live, tags are in query
- `POST /api/notes/:note_id/tags`: add tag to note, if note doesn't
already exist, it will be created
- `DELETE /api/notes/:note_id/tags/:tag_name` - remove tag from note
