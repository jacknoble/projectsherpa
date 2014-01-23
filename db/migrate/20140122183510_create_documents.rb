class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.integer :user_id
      t.integer :project_id
      t.string :file

      t.timestamps
    end

    add_index :documents, :user_id
    add_index :documents, :project_id
  end
end
