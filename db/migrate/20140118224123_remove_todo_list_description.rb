class RemoveTodoListDescription < ActiveRecord::Migration
  def up
    remove_column :todo_lists, :description
  end

  def down
    add_column :todo_lists, :description, :string
  end
end
