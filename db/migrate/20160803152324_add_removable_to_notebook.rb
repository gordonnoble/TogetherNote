class AddRemovableToNotebook < ActiveRecord::Migration[5.0]
  def change
    add_column :notebooks, :removable, :boolean, default: true
  end
end
