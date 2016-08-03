class NotebookNote < ApplicationRecord
  validates :notebook_id, :note_id, presence: true

  belongs_to :notebook
  belongs_to :note

end
