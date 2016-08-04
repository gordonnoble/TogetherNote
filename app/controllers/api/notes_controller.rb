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
    @note.destroy!
    render :show
  end
  
  private

  def note_params
    params.require(:note).permit(:title, :body)
  end

end
