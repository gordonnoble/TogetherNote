class RemoveIndexFromSessionToken < ActiveRecord::Migration[5.0]
  def change
    remove_index :users, :session_token
  end
end
