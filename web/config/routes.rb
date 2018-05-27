Rails.application.routes.draw do
  get 'pages/community'
  get 'pages/map'
  get 'pages/settings'
  get 'pages/feed'


  get '/pages/events/:id', to: 'pages#event'

  devise_for :users
  root 'pages#map'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
