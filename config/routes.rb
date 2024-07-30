Rails.application.routes.draw do
  devise_for :users
  devise_for :artists

  post "/account-session", to: "stripe#account_session", as: :onboarding_session
  post "/stripe/webhooks", to: "stripe#webhooks"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  authenticated :artist do
    root 'artists#dashboard', as: :authenticated_artist_root
    resources :songs
    resource :dashboard, to: "artists#dashboard"
  end

  authenticated :user do
    root 'music#show', as: :authenticated_user_root
  end

  resource :music, only: [:show], controller: :music do
    post "audio_player", to: "music#audio_player", on: :collection
  end
  
  root 'home#index'

  # Defines the root path route ("/")
  # root "posts#index"
end
