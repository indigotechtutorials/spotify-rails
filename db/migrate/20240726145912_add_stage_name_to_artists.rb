class AddStageNameToArtists < ActiveRecord::Migration[7.1]
  def change
    add_column :artists, :stage_name, :string
  end
end
