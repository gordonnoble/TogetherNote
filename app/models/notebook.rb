class Notebook < ApplicationRecord
  validates :name, presence: true
  validates :user, presence: true

  belongs_to :user, inverse_of: :notebooks

  has_many :notebook_notes, inverse_of: :notebook
  has_many :notes, through: :notebook_notes

  def note_count
    self.notes.count
  end

  def notes_hash
    return Note.hashify(self.notes)
  end

  def first_note
    self.notes[0]
  end
end
