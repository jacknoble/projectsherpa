class Document < ActiveRecord::Base
  attr_accessible :file, :project_id, :user_id

  validates :file, :project_id, :user_id, :presence=> true

  has_attached_file :file,
  :styles => {
    :thumb => ["120x160#", :jpg] },
  :convert_options => {
    :thumb => "-quality 75 -strip"
    }

  has_many :comments, :as => :commentable
  belongs_to :user
  belongs_to :project
end
