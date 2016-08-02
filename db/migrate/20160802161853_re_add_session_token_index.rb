class ReAddSessionTokenIndex < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :session_token, unique: true
  end
end
