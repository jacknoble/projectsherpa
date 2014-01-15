class TeamMembership < ActiveRecord::Base
  attr_accessible :project_id, :user_id

  validates :project_id, :user_id, :presence => true

  belongs_to :project
  belongs_to :user
end
