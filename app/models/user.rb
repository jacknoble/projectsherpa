class User < ActiveRecord::Base
  attr_accessible :company, :email, :fname, :lname, :photo, :password
  attr_reader :password

  validates :fname, :lname, :email,
            :session_token, :password_digest,
            :presence => true
  validates :password, length: {minimum: 6}

  before_validation :ensure_session_token


  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def self.find_by_credentials(email, pw)
    user = User.find_by_email(email)
    (user && user.has_password?(pw)) ? user : nil
  end

  def password=(pw)
    self.password_digest = BCrypt::Password.create(pw)
  end

  def has_password?(pw)
    BCrypt::Password.new(self.password_id).is_password?(pw)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
