class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    first_notebook = @user.notebooks.new(name: "Get Started")
    first_notebook.save!

    first_notebook.notes.create!(
      title: "Welcome to TogetherNote!",
      body: "Start writing! We'll save everything automagically.\nUse the 'Collaborate' button to add collaborators to this note.")

    @user.open_notebook_id = first_notebook.id

    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
