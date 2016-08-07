Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :notebooks, only: [:index, :show, :create, :destroy]
    resources :notes, only: [:show, :update, :create, :destroy]
  end

  patch '/api/notes/:id/switch', to: 'api/notes#switch'

  root to: 'static_pages#root'
end
