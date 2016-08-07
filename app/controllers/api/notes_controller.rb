class Api::NotesController < ApplicationController
  def show
    @note = Note.find(params[:id])
    render :show
  end

  def update
    @note = Note.find(params[:id])
    @note.update!(note_params)
    render :show
  end

  def create
    @note = Note.new(note_params)
    @note.save!
    notebookId = params[:note][:notebookId]
    @note.notebook_ids = [notebookId]
    render :show
  end

  def destroy
    @note = Note.find(params[:id])
    notebook = @note.notebooks.where(user_id: current_user.id).first

    if notebook.name == "Recycling"
      @note.destroy!
    else
      recycling = current_user.notebooks.where(name: "Recycling").first
      @note.notebook_notes.where(notebook_id: notebook.id).first.destroy!
      @note.notebook_ids += [recycling.id]
    end

    render :show
  end

  def switch
    @note = Note.find(params[:id])
    
    old_notebook = @note.notebooks.where(user_id: current_user.id).first
    @note.notebook_notes.where(notebook_id: old_notebook.id).first.destroy!
    @note.notebook_ids += [params[:notebook][:id]]

    render :show
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end

end
