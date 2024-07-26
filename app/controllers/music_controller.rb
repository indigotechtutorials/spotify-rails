class MusicController < ApplicationController
  def show
    @songs = Song.all
  end
end