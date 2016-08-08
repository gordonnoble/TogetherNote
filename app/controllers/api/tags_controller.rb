class Api::TagsController < ApplicationController

  def users_tags
    user = User.find(params[:id])
    @tags = user.all_tags
    render :index_by_user
  end
end
