class AddNullConstraintsProjectDescription < ActiveRecord::Migration
  def change
    change_column :users, :session_token, :string, :null => false
    change_column :projects, :title, :string, :null => false
    change_column :projects, :creator_id, :integer, :null => false
    change_column :team_memberships, :user_id, :integer, :null => false
    change_column :team_memberships, :project_id, :integer, :null => false
    add_column :projects, :description, :string
  end
end
