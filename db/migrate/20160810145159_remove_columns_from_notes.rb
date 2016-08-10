class RemoveColumnsFromNotes < ActiveRecord::Migration[5.0]
  def change
    remove_column :notes, :image_file_name
    remove_column :notes, :image_content_type
    remove_column :notes, :image_file_size
    remove_column :notes, :image_updated_at
  end
end
