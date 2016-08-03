# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Let's clean up first
User.destroy_all
Notebook.destroy_all
Note.destroy_all

# Alright, now for some users
gordo = User.new(username: "gordo", password: "badpass")
pooch = User.new(username: "pooch", password: "dogpass")
kit   = User.new(username: "kat", password: "catpass")

[gordo, pooch, kit].each do |user|
  first_notebook = user.notebooks.new(name: "Get Started")
  first_notebook.save!

  first_notebook.notes.create!(
    title: "Welcome to TogetherNote!",
    body: "Start writing! We'll save everything automagically.\n
      Use the 'Collaborate' button to add collaborators to this note.")

  user.open_notebook_id = first_notebook.id
  user.save!
end

gordo_notebook = Notebook.find(gordo.open_notebook_id)
gordo_notebook.notes.create!(title: "Intro to The Hobbit", body: " In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort. It had a perfectly round door like a porthole, painted green, with a shiny yellow brass knob in the exact middle.")
gordo_notebook.notes.create!(title: "Super Note", body: "Let it be noted: notes are not notable unless noteworthy.")
