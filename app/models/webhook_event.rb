class WebhookEvent < ApplicationRecord
  serialize :data, coder: JSON
  enum :status, ["pending", "failed", "processed"]
end
