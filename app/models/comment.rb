class Comment < ActiveRecord::Base
  attr_accessible :body, :parent_id, :title, :todo_list_item_id, :user_id      t.integer :todo_list_id,
                  :project_id, :file_id, :event_id

  validates :title, :user_id, :presence => true

  validates :parent_id, :todo_list_item_id, :user_id, :project_id, :file_id,
            :event_id, :uniqueness => true

  has_many (
    :sub_comments,
    :class => "Comment",
    :primary_key => :id
    :foreign_key => :parent_id
  )

  belongs_to :parent
  belongs_to :todo_list_item
  belongs_to :user
  belongs_to :project
  belongs_to :file
  belongs_to :event
end
