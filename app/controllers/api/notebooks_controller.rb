class Api::NotebooksController < ApplicationController

  def show
    @notebook = Notebook.find(params[:id])
    render :show
  end

  def index
    @notebooks = current_user.notebooks
    render :index
  end
end
