Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create]
    resources :notebooks, only: [:index, :show]
    resources :notes, only: [:show, :update, :create, :destroy]
  end

  root to: 'static_pages#root'
end
