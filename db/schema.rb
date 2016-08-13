# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160813200919) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "notebook_notes", force: :cascade do |t|
    t.integer  "note_id",     null: false
    t.integer  "notebook_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["note_id"], name: "index_notebook_notes_on_note_id", using: :btree
    t.index ["notebook_id"], name: "index_notebook_notes_on_notebook_id", using: :btree
  end

  create_table "notebooks", force: :cascade do |t|
    t.string   "name",                      null: false
    t.integer  "user_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.boolean  "removable",  default: true
    t.index ["user_id"], name: "index_notebooks_on_user_id", using: :btree
  end

  create_table "notes", force: :cascade do |t|
    t.string   "title"
    t.text     "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["title"], name: "index_notes_on_title", using: :btree
  end

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id",     null: false
    t.integer  "note_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tag_id", "note_id"], name: "index_taggings_on_tag_id_and_note_id", unique: true, using: :btree
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",            null: false
    t.string   "password_digest",     null: false
    t.string   "session_token"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "open_notebook_id"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.index ["password_digest"], name: "index_users_on_password_digest", unique: true, using: :btree
    t.index ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
