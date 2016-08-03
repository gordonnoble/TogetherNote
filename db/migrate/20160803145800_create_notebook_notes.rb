class CreateNotebookNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notebook_notes do |t|
      t.integer :note_id, null: false
      t.integer :notebook_id, null: false

      t.timestamps
    end

    add_index :notebook_notes, :note_id
    add_index :notebook_notes, :notebook_id
  end
end
