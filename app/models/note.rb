class Note < ApplicationRecord
    has_many :notebook_notes
    has_many :notebooks, through: :notebook_notes

    def all_users
      self.notebooks.includes(:user).map{ |nb| nb.user }.flatten
    end
end
