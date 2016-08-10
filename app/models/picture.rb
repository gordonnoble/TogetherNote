class Picture < ApplicationRecord
  has_attached_file :image, default_url: ""
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates :note_id, presence: true
  belongs_to :note, inverse_of: :pictures
end
