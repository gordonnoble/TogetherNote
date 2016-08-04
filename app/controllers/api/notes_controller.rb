class Api::NotesController < ApplicationController
  def show
    @note = Note.find(params[:id])
    render :show
  end

  def update
    @note = Note.find(params[:id])
    @note.update(note_params);
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end
end
