class Note < ApplicationRecord
    has_many :notebook_notes, inverse_of: :note
    has_many :notebooks, through: :notebook_notes
    has_many :taggings, dependent: :destroy, inverse_of: :note
    has_many :tags, through: :taggings

    def all_users
      self.notebooks.includes(:user).map{ |nb| nb.user }.flatten
    end

    def plain_text_body
      ActionView::Base.full_sanitizer.sanitize(self.body).to_s
    end
end
