class User < ApplicationRecord
  validates :username, :password_digest, presence: true
  validates :username, :password_digest, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  after_initialize :ensure_session_token
  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)

    while User.find_by(password_digest: self.password_digest)
      self.password_digest = BCrypt::Password.create(password)
    end
  end

  def correct_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return user if user && user.correct_password?(password)
    nil
  end

  def reset_token!
    self.session_token = new_token

    while User.find_by(session_token: self.session_token)
      self.session_token = new_token
    end

    self.save!
    self.session_token
  end

  private

  def new_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= new_token
  end

end
