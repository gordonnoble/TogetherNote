# FresherNote

[Heroku link][heroku] **Note:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

(App Name) is a web application inspired by Evernote that will be build using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
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

- [ ] create new project
- [ ] set up webpack & flux scaffold with skeleton files
- [ ] create `User` model
- [ ] authentication backend setup
- [ ] create `StaticPages` controller and root view
- [ ] set up flux cycle for frontend auth
- [ ] user signup/signin components
- [ ] blank landing component after signin
- [ ] seed users

### Phase 2: Notebook and Note Basics (2 days, W1 Th 6pm)
**Objective:** Notes can be created, read, edited, and destroyed through the
API. Notes are organized by notebook.

- [ ] create a `Notebook` model
- [ ] R/CRUD API for notebooks (`NotebooksController`)
  - [ ] for now user's are defaulted to one notebook
- [ ] create a `Note` model, `UserNote` model
  - [ ] `UserNote` is a join table
- [ ] CRUD API for notes (`NotesController`)
- [ ] seed the database with a small amount of test data
- [ ] jBuilder views for notebooks and notes
- [ ] implement `Notebook` component with flux loop as needed
- [ ] implement `NoteIndex` component with flux loop as needed
- [ ] implement each component, building out the flux loop as needed.
  - [ ] `Sidebar`
  - [ ] `NoteIndexItem`
  - [ ] `NoteDetail`
    - [ ] Updates are saved when user idles or clicks away


### Phase 3: Refinement of `Notebook` component (1 day, W2 F 6pm)
**Objective:** Notebooks can be created, updated, destroyed via the notebook drawer

- [ ] CUD/CRUD API for notebooks
  - [ ] implement notebook drawer
  - [ ] implement switching between notebooks

### Phase 4: CSS Refinement and Tags (1 day, W2 M 6pm)
**objective:** Clean up CSS and enable tagging and searchy-by-tags

- [ ] Integrate RTF (`react-quill`, based on Quill.js)
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.
- [ ] Add Quill styling to seeded notes

### Phase 5: Complex Styling in Notes (1 day, W2 Tu 6pm)
**objective:** Enable complex styling of notes.

- [ ] Clean up and refine CSS
- [ ] Create Tag model and join table
  - [ ] API, flux loops, and components for tagging notes and
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
