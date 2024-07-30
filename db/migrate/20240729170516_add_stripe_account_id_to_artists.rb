class AddStripeAccountIdToArtists < ActiveRecord::Migration[7.1]
  def change
    add_column :artists, :stripe_account_id, :string
  end
end
