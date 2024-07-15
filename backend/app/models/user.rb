class User < ApplicationRecord
  enum role: { default: 0, admin: 1 }
  validates :name, presence: true
  validates :email, presence: true
  validates_uniqueness_of :email
  validates :password, presence: true, length: { minimum: 11 }

  has_secure_password

  def admin?
    role == 'admin'
  end
end