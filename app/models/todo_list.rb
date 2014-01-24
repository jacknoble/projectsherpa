class TodoList < ActiveRecord::Base
  attr_accessible :title, :project_id

  validates :title, :project_id, :presence => true
  belongs_to :project
  has_many :todo_list_items
  before_destroy do |todo_list|
    TodoListItem.destroy_all "todo_list_id = #{todo_list.id}"
  end
end
