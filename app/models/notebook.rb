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
    notesHash = {};

    self.notes.each do |note|
      notesHash[note.id] = {}
      notesHash[note.id][:id] = note.id
      notesHash[note.id][:title] = note.title
      notesHash[note.id][:body] = note.plain_text_body
    end

    notesHash
  end
end
