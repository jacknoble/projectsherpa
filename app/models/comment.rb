class Comment < ActiveRecord::Base
  attr_accessible :body, :title, :commentable_id, :commentable_type, :user_id

  validates :title, :user_id, :presence => true

  has_many :comments, :as => :commentable
  belongs_to :commentable, :polymorphic => true
  belongs_to :user


  def commentable_head
    commentable.title || commentable.name
  end

  def commentable_sub
    commentable.description || commentable.body
  end
end
