class AddOpenNotebookToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :open_notebook_id, :integer
  end
end
