Sherpa::Application.routes.draw do
  resources :users, except: [:index, :destroy]
end
