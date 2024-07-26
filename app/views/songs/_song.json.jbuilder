json.extract! song, :id, :title, :image, :audio_file, :artist_id, :created_at, :updated_at
json.url song_url(song, format: :json)
json.image url_for(song.image)
json.audio_file url_for(song.audio_file)
