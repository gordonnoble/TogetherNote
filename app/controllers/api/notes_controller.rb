class Api::NotesController < ApplicationController
  def show
    @note = Note.find(params[:id])
    render :show
  end

  def update
    @note = Note.find(params[:id])
    @note.update!(note_params)

    Pusher.trigger('note_' + @note.id.to_s, 'external_update', {
      title: @note.title,
      body: @note.body
    })

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
    @note.notebook_notes.where(notebook_id: notebook.id).first.destroy!

    if notebook.name != "Recycling"
      recycling = current_user.notebooks.where(name: "Recycling").first
      @note.notebook_ids += [recycling.id]
    elsif @note.notebooks.count == 0
      @note.destroy!
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

  def tag
    note = Note.find(params[:id])
    tag_name = params[:tag][:name]
    @tag = Tag.find_by(name: tag_name) || Tag.create!(name: tag_name)

    note.tag_ids += [@tag.id]
    render 'api/tags/show'
  end

  def tags_notes
    @tag = Tag.find(params[:id])
    @notes = @tag.notes_hash_by_user(current_user)
    render 'api/tags/show_with_notes'
  end

  def add_image
    @picture = Picture.new(note_id: params[:id])
    @picture.image = params[:note][:image]
    @picture.save!

    note = Note.find(params[:id])
    note.picture_ids += [@picture.id]

    render :picture
  end

  def add_user
    @note = Note.find(params[:id])
    user = User.find_by(username: params[:user][:username])

    if user
      notebook = user.notebooks.where(name: "Shared")[0]
      notebook.note_ids += [@note.id]

      Pusher.trigger('share_channel_' + user.id.to_s, 'shared_note', {
        title: @note.title,
        username: current_user.username
      })

      render :show
    else
      render json: ["Unable find a user with that name."]
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end

end
