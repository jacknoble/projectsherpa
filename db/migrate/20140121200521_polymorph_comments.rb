class PolymorphComments < ActiveRecord::Migration
  def change
    drop_table :comments

    create_table :comments do |t|
      t.string :title
      t.text :body
      t.integer :user_id
      t.references :commentable, :polymorphic => true
    end

  end

end
