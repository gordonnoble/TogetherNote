class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    session[:session_token] = user.reset_token!
    @current_user = user
  end

  def logout!
    session[:session_token] = nil
    current_user.reset_token!
    @current_user = nil
  end

  # def require_logged_in
  #   render json: { base: ['invalid credentials']}, status: 401 if !logged_in?
  # end
end
