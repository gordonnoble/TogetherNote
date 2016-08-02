class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token

      t.timestamps
    end

    add_index :users, :username, unique: true
    add_index :users, :password_digest, unique: true
    add_index :users, :session_token
  end
end
