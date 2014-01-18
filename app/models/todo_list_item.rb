class TodoListItem < ActiveRecord::Base
  attr_accessible :assigned_user_id, :completed, :deadline, :name, :todo_list_id

  validates :name, :presence => true

  belongs_to: (
    :user,
    :class_name => "User",
    :primary_key => :id,
    :foreign_key => :assigned_user_id
  )
end
