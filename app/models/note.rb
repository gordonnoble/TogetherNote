class Note < ApplicationRecord
    has_many :notebook_notes, inverse_of: :note
    has_many :notebooks, through: :notebook_notes

    def all_users
      self.notebooks.includes(:user).map{ |nb| nb.user }.flatten
    end
end
