# FresherNote

[TogetherNote](https://togethernote.herokuapp.com/)

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

(App Name) is a web application inspired by Evernote that will be build using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] Hosting on Heroku
- [x] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](docs/production_readme.md) -- you'll write this later)
- [ ] Notebooks for organizing notes
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Notes
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Tags for notes
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Rich Text Editing of notes
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Live multi-user editing of a single note
  - [ ] Shareable notes
  - [ ] Notes update live, without use of a 'save' button
  - [ ] Two users can update a single note at once from different locations

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Back and Front End Authentication (1 day, W1 Tu 6pm)
**Objective:** Functioning rails project with full authentication

- [x] create new project
- [x] set up webpack & flux scaffold with skeleton files
- [x] create `User` model
- [x] authentication backend setup
- [x] create `StaticPages` controller and root view
- [x] set up flux cycle for frontend auth
- [x] user signup/signin components
- [x] blank landing component after signin
- [x] seed users

### Phase 2: Notebook and Note Basics (2 days, W1 Th 6pm)
**Objective:** Notes can be created, read, edited, and destroyed through the
API. Notes are organized by notebook.

- [x] create a `Notebook` model
- [x] R/CRUD API for notebooks (`NotebooksController`)
  - [x] for now user's are defaulted to one notebook
- [x] create a `Note` model, `NotebookNote` model
  - [x] `NotebookNote` is a join table
- [x] CRUD API for notes (`NotesController`)
- [x] seed the database with a small amount of test data
- [x] jBuilder views for notebooks and notes
- [x] implement `Notebook` component with flux loop as needed
- [x] implement `NoteIndex` component with flux loop as needed
- [x] implement each component, building out the flux loop as needed.
  - [x] `Sidebar`
  - [x] `NoteIndexItem`
  - [x] `NoteDetail`
    - [x] Updates are saved when user idles or clicks away


### Phase 3: Refinement of `Notebook` component (1 day, W2 F 6pm)
**Objective:** Notebooks can be created, updated, destroyed via the notebook drawer

- [x] CUD/CRUD API for notebooks
  - [x] implement notebook drawer
  - [x] implement switching between notebooks

### Phase 4: CSS Refinement and Tags (1 day, W2 M 6pm)
**objective:** Clean up CSS and enable tagging and searchy-by-tags

- [x] Integrate RTF (`react-quill`, based on Quill.js)
- [x] Use Rails helpers to sanitize HTML before rendering.
- [x] Style the new Quill elements.
- [x] Add Quill styling to seeded notes

### Phase 5: Complex Styling in Notes (1 day, W2 Tu 6pm)
**objective:** Enable complex styling of notes.

- [x] Clean up and refine CSS
- [x] Create Tag model and join table
  - [x] API, flux loops, and components for tagging notes and
  filtering by note tags

### Phase 6: - Live Editing by Multiple Users (3 day,s W2 F 6pm)
**objective:** Enable live editing of one note by multiple users

- [ ] Implement `NoteSession` model and join table
- [ ] Notes keep track of which sessions they are opened in
- [ ] NoteSessions are added when a note's `NoteDetail` component is rendered,
    removed when a note's `NoteDetail` is no longer rendered
- [ ] Notes can be shared with other users, defaults to "Shared" notebook
- [ ] Notes update realtime with multiple users at different locations
- [ ] Alert if note conflict (if I have time)
- [ ] Deleted notes go to hidden Recycling notebook (if I have time)


[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
