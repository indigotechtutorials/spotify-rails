class CreateWebhookEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :webhook_events do |t|
      t.string :source
      t.text :data
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
