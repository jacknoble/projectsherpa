class TodoList < ActiveRecord::Base
  attr_accessible :description, :title, :project_id

  validates :title, :project_id, :presence => true
  belongs_to :project
  has_many :todo_list_items
end
