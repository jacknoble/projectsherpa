class TodoListItem < ActiveRecord::Base
  attr_accessible :assigned_user_id, :order, :completed, :deadline, :name, :todo_list_id

  validates :name, :presence => true

  before_validation :ensure_order, :on => :create

  belongs_to(
    :user,
    :class_name => "User",
    :primary_key => :id,
    :foreign_key => :assigned_user_id
  )

  belongs_to :todo_list
  has_one :project, :through => :todo_list
  has_many :comments, :as => :commentable

  def self.last_or_two
    (self.count > 2) ? self.last(2) : [self.last]
  end

  def siblings
    TodoListItem.where('todo_list_id = ?', self.todo_list_id)
  end

  def ensure_order
    if self.order.nil?
      sibs = self.siblings
      count = sibs.count
      if count == 0
        self.order = 0
      elsif count == 1
        self.order = 1
      else
        self.order = 1
        last_two = sibs.last(2)
        last_two[1].order = (1 + last_two[0].order) / 2.0
        TodoListItem.transaction do 
          last_two.each(&:save!)
        end
      end
    end
  end

end
