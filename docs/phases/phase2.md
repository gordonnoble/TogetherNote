# Phase 2: Notebook Model, Note model, API, and components (2 days, W1 Th 6pm)

## Rails
### Models
* Notebook, Note, UserNote

### Controllers
* Api::NotesController (create, index, show, update)

### Views
* notebooks/show.json.jbuilder
  - returns a notebook and the index of associated notes (just titles)
* notes/show.json.jbuilder
  - used for note detail view


## Flux
### Views (React Components)
* Notebook
* NotesIndex
  - NotesIndexItem
* NoteDetail

### Stores
* Notebook
* Note

### Actions
* `ApiActions.receiveSingleNotebook`
* `ApiActions.receiveNotebooksNotes`
* `ApiActions.receiveSingleNote`
* `NotebookActions.fetchSingleNotebook`
* `NoteActions.fetchNotebooksNotes`
* `NoteActions.fetchSingleNote`
* `NoteActions.editNote`

### ApiUtil
* `ApiUtil.fetchSingleNotebook`
* `ApiUtil.fetchNotebooksNotes`
* `ApiUtil.fetchSingleNote`
* `ApiUtil.editNote`

## Gems/Libraries
