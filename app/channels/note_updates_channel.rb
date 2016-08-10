class NoteUpdatesChannel < ApplicationCable::Channel
  def subscribed
    # What's this?
    stream_from 'note_updates'
  end
end
