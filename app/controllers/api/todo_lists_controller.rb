class Api::TodoListsController < ApplicationController
  def index

  end

  def create
    params[:todo_list][:project_id] = params[:project_id]
    @todo_list = TodoList.new(params[:todo_list])
    if @todo_list.save
      render :json => @todo_list
    else
      render :json => @todo_list.errors
    end
  end

  def show
  end

  def update
  end

  def destroy
  end
end
