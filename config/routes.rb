Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :notebooks, only: [:index, :show, :create, :destroy]
    resources :notes, only: [:show, :update, :create, :destroy]
  end

  patch 'api/notes/:id/switch', to: 'api/notes#switch'
  post 'api/notes/:id/tags', to: 'api/notes#tag'
  delete 'api/notes/:id/tags', to: 'api/notes#untag'
  get 'api/users/:id/tags', to: 'api/tags#users_tags'
  get 'api/tags/:id/notes', to: 'api/notes#tags_notes'
  patch 'api/users/:id', to: 'api/users#update_avatar'
  post 'api/notes/:id/users', to: 'api/notes#add_user'
  post 'api/session/guest', to: 'api/sessions#create_guest'

  root to: 'static_pages#root'
end
