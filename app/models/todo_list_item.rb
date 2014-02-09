class TodoListItem < ActiveRecord::Base
  attr_accessible :assigned_user_id, :order, :completed, :deadline, :name, :todo_list_id

  validates :name, :presence => true

  before_validation(
    :ensure_order, 
    :if => Proc.new {|a| a.order.nil? || a.todo_list_id_changed?}
  )

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

  def family
    TodoListItem.where('todo_list_id = ?', self.todo_list_id)
  end

  def ensure_order
    fam = self.family
    count = fam.count
    self.order = (count == 0) ? 0 : 1
    if count > 1
      last_two = fam.last(2)
      last_two[1].order = (1 + last_two[0].order) / 2.0
      TodoListItem.transaction do 
        last_two.each(&:save!)
      end
    end
    p "in model order is #{self.order}"
  end

end
