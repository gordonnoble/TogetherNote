class Api::NotebooksController < ApplicationController

  def show
    @notebook = Notebook.find(params[:id])
    render :show
  end
end
