# Phase 3: Refinement of `Notebook` component (1 day, W2 F 6pm)

## Rails

### Controllers
* Api::NotebooksController (create, destroy, index, update)
* Api::NotesController (create, destroy)

### Views
* notebooks/index.json.jbuilder
* notebooks/show.json.jbuilder

## Flux
### Views (React Components)
* NotebooksDrawer
  - NotebookDrawerItem
* NotebookForm

### Stores
* Notebook

### Actions
* `ApiActions.receiveAllNotebooks`
* `NotebookActions.fetchAllNotebooks`
* `NotebookActions.editNotebook`
* `NotebookActions.createNotebook`
* `NotebookActions.deleteNotebook`
* `NoteActions.createNote`
* `NoteActions.deleteNote`

### ApiUtil
* `ApiUtil.fetchAllNotebooks`
* `ApiUtil.editNotebook`
* `ApiUtil.createNotebook`
* `ApiUtil.deleteNotebook`
* `ApiUtil.createNote`
* `ApiUtil.deleteNote`

## Gems/Libraries
