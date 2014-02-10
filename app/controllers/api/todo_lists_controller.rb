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
    @list = TodoList.find(params[:id])
    render :partial => 'api/todo_lists/todo_list'
  end

  def update
    @list = TodoList.find(params[:id])
    if @list.update_attributes(params[:todo_list])
      render :partial => 'api/todo_lists/todo_list'
    else
      render :status => 422
    end
  end

  def destroy
    @todo_list = TodoList.find(params[:id])
    @todo_list.destroy
    render :json=> {}
  end
end
