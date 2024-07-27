class MusicController < ApplicationController
  def show
    @songs = Song.all
  end

  def audio_player
    @song = Song.find(params[:song_id])
  end
end