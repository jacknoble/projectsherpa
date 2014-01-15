class CreateTodoLists < ActiveRecord::Migration
  def change
    create_table :todo_lists do |t|
      t.string :title, null: false
      t.string :description
      t.integer :project_id, null: false

      t.timestamps
    end

    add_index :todo_lists, :project_id

  end
end
