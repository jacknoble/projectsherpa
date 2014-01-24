class TodoListItem < ActiveRecord::Base
  attr_accessible :assigned_user_id, :order, :completed, :deadline, :name, :todo_list_id

  validates :name, :presence => true

  before_validation :ensure_order, :on => [:create]

  belongs_to(
    :user,
    :class_name => "User",
    :primary_key => :id,
    :foreign_key => :assigned_user_id
  )

  belongs_to :todo_list
  has_one :project, :through => :todo_list
  has_many :comments, :as => :commentable

  def ensure_order
    self.order ||= rand
  end
end
