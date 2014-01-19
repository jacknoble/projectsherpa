class User < ActiveRecord::Base
  attr_accessible(
    :email, :fname, :lname, :photo, :password, :name,
    :company_id, :company_name
  )
  attr_reader :password

  validates :name, :fname, :lname, :email,
            :session_token, :password_digest,
            :presence => true
  validates :password, length: {minimum: 6}, if: :password_present?

  before_validation :ensure_session_token, :add_lname_fname

  has_many(
    :created_projects,
    class_name: "Project",
    primary_key: :id,
    foreign_key: :creator_id
  )

  has_many :team_memberships
  has_many :projects, :through => :team_memberships
  has_many(
    :assigned_items,
    :class_name => "TodoListItem",
    :primary_key => :id,
    :foreign_key => :assigned_user_id
  )
  belongs_to :company

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def company_name=(company_name)
    nil
  end

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    (user && user.has_password?(user_params[:password])) ? user : nil
  end

  def password=(pw)
    @password = pw
    self.password_digest = BCrypt::Password.create(pw)
  end

  def has_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def add_lname_fname
    self.fname, self.lname = self.name.split(" ")
  end

  def password_present?
    !self.password.nil?
  end

end
