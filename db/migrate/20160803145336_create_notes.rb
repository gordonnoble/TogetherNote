class CreateNotes < ActiveRecord::Migration[5.0]
  def change
    create_table :notes do |t|
      t.string :title
      t.text :body

      t.timestamps
    end

    add_index :notes, :title
  end
end
