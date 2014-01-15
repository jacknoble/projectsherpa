class Project < ActiveRecord::Base
  attr_accessible :creator_id, :title

  validates :creator_id, :title, presence: true

  belongs_to(
    :creator,
    class_name: "User",
    primary_key: :id,
    foreign_key: :creator_id
  )

  has_many :team_memberships
  has_many :team_members, :through => :team_memberships, :source => :user_id
  has_many :todo_lists
end
