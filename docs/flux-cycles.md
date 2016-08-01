# Flux Cycles

## Auth Cycles

### Session API Request Actions
* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions
* `receiveCurrentUser`
  0. invoked from an API callback
  0. stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  0. invoked from an API callback
  0. removes `_currentUser` in `CurrentUserStore`

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. sets `form` and `_errors` in the `ErrorStore`
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. removes `_errors` for a given `form` in the `ErrorStore`

## Note Cycles

### Notes API Request Actions
* `fetchNotebooksNotes`
  0. invoked from `Notebook` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks/:notebookId` is called
  0. `receiveNotebooksNotes` is set as the success callback

* `createNote`
  0. invoked from new note button `onClick`
  0. `POST /api/notes` is called.
  0. `receiveSingleNote` is set as the success callback.

* `fetchSingleNote`
  0. invoked from `NoteDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notes/:id` is called.
  0. `receiveSingleNote` is set as the success callback.

* `updateNote`
  0. invoked from `NoteDetail` `onChange`
  0. `POST /api/notes` is called.
  0. `receiveSingleNote` is set as the success callback.

* `destroyNote`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/notes/:id` is called.
  0. `removeNote` is set as the success callback.

### Notes API Response Actions
* `receiveNotebooksNotes`
  0. invoked from API callback.
  0. `NoteStore` updates `_notes` and emits change.

* `receiveSingleNote`
  0. invoked from an API callback.
  0. `NoteStore` updates `_notes[id]` and emits change.

* `removeNote`
  0. invoked from an API callback.
  0. `NoteStore` removes `_notes[id]` and emits change.

### Store Listeners
* `NotesIndex` component listens to `NoteStore`.
* `NoteDetail` component listens to `NoteStore`.


## Notebook Cycles

### Notebooks Api Request Actions
* `fetchAllNotebooks`
  0. invoked from `NotebooksIndex` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks` is called.
  0. `receiveAllNotebooks` is set as the success callback.

* `createNotebook`
  0. invoked from new notebook button `onClick`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the callback.

* `fetchSingleNotebook`
  0. invoked from `NotebookDetail` `didMount`/`willReceiveProps`
  0. `GET /api/notebooks/:id` is called.
  0. `receiveSingleNotebook` is set as the success callback.

* `updateNotebook`
  0. invoked from `NotebookForm` `onSubmit`
  0. `POST /api/notebooks` is called.
  0. `receiveSingleNotebook` is set as the success callback.

* `destroyNotebook`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/notebooks/:id` is called.
  0. `removeNotebook` is set as the success callback.

### Notebooks API Response Actions
* `receiveAllNotebooks`
  0. invoked from an API callback.
  0. `NotebookStore` updates `_notebooks` and emits change.

* `receiveSingleNotebook`
  0. invoked from an API callback.
  0. `NotebookStore` updates `_notebooks[id]` and emits change.

* `removeNotebook`
  0. invoked from an API callback.
  0. `NotebookStore` removes `_notebooks[id]` and emits change.

### Store Listeners

* `Notebook` component listens to `NotebookStore`
* `NotebooksIndex` component listens to `NotebookStore`

## Tag Search Cycle

### Tag Search Api Request Actions
* 'fetchTagResults'
  0. invoked from tag checkboxes in `SearchDrawer`
  0. `GET /api/notes` is called
  0. `receiveSearchResults` is set as the success callback

### Tag Search Api Response Actions
* 'receiveTagResults'
  0. invoked from API callback
  0. `SearchStore` updates `_results` and emits change

## Store Listeners
* `SearchDrawer` component listens to `SearchStore`
