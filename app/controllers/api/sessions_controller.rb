class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(*user_credentials)

    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ["Invalid credentials."], status: 401
    end
  end

  def destroy
    @user = current_user

    if @user
      logout!
      render 'api/users/show'
    else
      render json: ["Sign out who?"], status: 404
    end
  end

  private

  def user_credentials
    [params[:user][:username], params[:user][:password]]
  end
end
