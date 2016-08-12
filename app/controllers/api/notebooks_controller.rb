class Api::NotebooksController < ApplicationController

  def show
    @notebook = Notebook.find(params[:id])
    current_user.set_open_notebook!(@notebook.id)
    render :show
  end

  def index
    notebooks = current_user.notebooks_hash
    render json: notebooks
  end

  def create
    @notebook = current_user.notebooks.new(notebook_params)

    if @notebook.save
      @notebook.notes.create!(title: "", body: "")
      current_user.set_open_notebook!(@notebook.id)
      render :show
    else
      render @notebook.errors.full_messages, status: 422
    end
  end

  def destroy
    @notebook = Notebook.find(params[:id])

    if @notebook.destroy
      recycling = current_user.notebooks.where(name: "Recycling").first
      old_id = @notebook.id

      @notebook.notes.each do |note|
        note.notebook_notes.where(notebook_id: old_id).first.destroy!
        note.notebook_ids += [recycling.id]
      end

      new_notebook = current_user.notebooks[0]
      current_user.set_open_notebook!(new_notebook.id)

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
