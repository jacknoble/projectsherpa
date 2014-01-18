class CreateTodoListItems < ActiveRecord::Migration
  def change
    create_table :todo_list_items do |t|
      t.string :name, :null => false
      t.integer :assigned_user_id
      t.datetime :deadline
      t.boolean :completed, :default => false
      t.integer :todo_list_id

      t.timestamps
    end

    add_index :todo_list_items, :assigned_user_id
    add_index :todo_list_items, :deadline
    add_index :todo_list_items, :todo_list_id
  end
end
