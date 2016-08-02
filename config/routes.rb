Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy], defaults: { format: :json }
    resources :users, only: [:create], defaults: { format: :json }
  end
  
  root to: 'static_pages#root'
end
