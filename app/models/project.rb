class Project < ActiveRecord::Base
  attr_accessible :creator_id, :title

  belongs_to(
    :creator,
    class_name: "User",
    primary_key: :id,
    foreign_key: :creator_id
  )
end
