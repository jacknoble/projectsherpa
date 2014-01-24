class AddTodoSort < ActiveRecord::Migration
  def change
    add_column :todo_list_items, :order, :float
  end

end
