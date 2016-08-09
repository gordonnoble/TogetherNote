class Api::TagsController < ApplicationController

  def users_tags
    user = User.find(params[:id])
    tags = user.tags_hash
    render json: tags
  end
end
