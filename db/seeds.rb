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
