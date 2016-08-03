class ChangeColumnOnNotebooks < ActiveRecord::Migration[5.0]
  def change
    change_column :notebooks, :user_id, :integer, null: true
  end
end
