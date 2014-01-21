Sherpa::Application.routes.draw do
  root to: "root#root"

  resources :users, :only => [:new, :create]
  resource :session, :only => [:new, :create, :destroy]

  namespace :api, :defaults => {:format => :json} do
    resources :users, :only => [:show, :update, :destroy] do
      resources :projects, :only => [:index]
    end

    resources :projects, :only => [:show, :update, :create, :destroy] do
      resources :todo_lists, :only => [:index, :create]
    end

    resources :todo_lists, :only => [:show, :update, :destroy] do
      resources :todo_list_items, :only =>[:index, :create]
    end

    resources :todo_list_items, :only => [:show, :update, :destroy]

    resources :events, :only => [:index, :show]
  end


end
