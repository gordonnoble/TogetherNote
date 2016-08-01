## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * **SignUp**
  * **SignIn**
  * **Notebook**
    * Sidebar
    * NoteIndex
      * NoteIndexItem
    * **NoteDetail**
      * NoteFormatting
      * NoteContent
      * NoteTags
    * NotebookDrawer
      * Notebooks
      * NotebookForm
    * SearchDrawer


## Routes

* **component:** `App` **path:** `/`
  * **component** `SignUp` **path:** `\signup`
  * **component** `SignIn` **path:** `\signin`
  * **component** `Notebook`, **path::** `\notebooks\:id`
    * **component** `NoteDetail`, **path:** `\notebooks\:noteId`

Home will default to most recently opened notebook and display index for
that notebook's notes.
