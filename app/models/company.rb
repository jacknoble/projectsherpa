class Company < ActiveRecord::Base
  attr_accessible :name

  validates :name, :presence => true

  has_many(
    :employees,
    :class_name => "User",
    :primary_key => :id,
    :foreign_key => :company_id
  )

end
