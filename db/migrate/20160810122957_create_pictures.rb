class CreatePictures < ActiveRecord::Migration[5.0]
  def change
    create_table :pictures do |t|
      t.integer :note_id, null: false

      t.timestamps
    end

    add_index :pictures, :note_id
  end
end
