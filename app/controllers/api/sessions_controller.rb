require 'rubygems'
require 'rake'
load 'Rakefile'

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

  def create_guest
    @user = User.find_by(username: "guest")

    login(@user)
    render 'api/users/show'
  end

  def destroy
    @user = current_user


    if @user
      logout!
      render 'api/users/show'
    else
      render json: ["Sign out who?"], status: 404
    end

    if @user.username == "guest"
      Thread.new{ system 'bundle exec rake db:seed:guest' }
    end
  end

  private

  def user_credentials
    [params[:user][:username], params[:user][:password]]
  end
end
