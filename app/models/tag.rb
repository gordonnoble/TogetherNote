class Tag < ApplicationRecord
  validates :name, presence: true

  has_many :taggings, dependent: :destroy, inverse_of: :tag
  has_many :notes, through: :taggings
end
