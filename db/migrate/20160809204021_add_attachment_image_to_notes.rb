class AddAttachmentImageToNotes < ActiveRecord::Migration
  def self.up
    change_table :notes do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :notes, :image
  end
end
