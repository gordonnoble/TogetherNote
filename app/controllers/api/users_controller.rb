class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    inbox = @user.notebooks.new(name: "Inbox", removable: false)
    inbox.save!
    recycling = @user.notebooks.new(name: "Recycling", removable: false)
    recycling.save!
    getting_started = @user.notebooks.new(name: "Getting Started")
    getting_started.save!

    getting_started.notes.create!(
      title: "Welcome to TogetherNote!",
      body: "Start writing! We'll save everything automagically.\nUse the 'Collaborate' button to add collaborators to this note.")

    @user.open_notebook_id = getting_started.id


    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update_avatar
    user = User.find(params[:id])
    user.avatar = params[:user][:avatar]
    user.save!

    render json: {image_url: user.avatar.url}
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
