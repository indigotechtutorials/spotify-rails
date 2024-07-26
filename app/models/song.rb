class Song < ApplicationRecord
  belongs_to :artist
  has_one_attached :image
  has_one_attached :audio_file
end
