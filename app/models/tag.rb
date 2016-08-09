class Tag < ApplicationRecord
  validates :name, presence: true

  has_many :taggings, dependent: :destroy, inverse_of: :tag
  has_many :notes, through: :taggings

  def notes_hash_by_user(user)
    notes = self.notes.select{ |note| note.all_users.include?(user) }
    return Note.hashify(notes)
  end
end
