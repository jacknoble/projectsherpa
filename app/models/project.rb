class Project < ActiveRecord::Base
  attr_accessible :creator_id, :title, :description, :team_member_ids

  validates :creator_id, :title, presence: true

  belongs_to(
    :creator,
    class_name: "User",
    primary_key: :id,
    foreign_key: :creator_id
  )

  has_many :team_memberships
  has_many :team_members, :through => :team_memberships, :source => :user
  has_many :todo_lists
  has_many :comments, as: :commentable
  has_many :documents

  after_save :add_creator_as_member
  before_destroy {|project| TodoList.destroy_all "project_id = #{project.id}"}
  before_destroy {|project| Document.destroy_all "project_id = #{project.id}"}
  def add_creator_as_member
    TeamMembership.create!(user_id: self.creator_id, project_id: self.id)
  end

end
