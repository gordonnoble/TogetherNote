class Api::NotebooksController < ApplicationController

  def show
    @notebook = Notebook.find(params[:id])
    render :show
  end

  def index
    @notebooks = current_user.notebooks
    render :index
  end

  def create
    @notebook = current_user.notebooks.new(notebook_params)

    if @notebook.save
      render :show
    else
      render @notebook.errors.full_messages, status: 422
    end
  end

  private

  def notebook_params
    params.require(:notebook).permit(:name);
  end
end
