class AddStripeStatusToArtists < ActiveRecord::Migration[7.1]
  def change
    add_column :artists, :stripe_status, :integer, default: 0
  end
end
