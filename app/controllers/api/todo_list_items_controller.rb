class Api::TodoListItemsController < ApplicationController

  def create
    @todo_list_item = TodoListItem.new(params[:todo_list_item])
    if @todo_list_item.save!
      render :partial => "api/todo_list_items/todo_list_item"
    else
      render :json => @todo_list_item.errors.full_messages,
      :status => :unprocessable_entity
    end
  end

  def update
    @todo_list_item = TodoListItem.find(params[:id])
    if @todo_list_item.update_attributes(params[:todo_list_item])
      render :json => @todo_list_item
    else
      render :json => 422
    end
  end

  def destroy
    @todo_list_item = TodoListItem.find(params[:id])
    @todo_list_item.destroy
    render :json => {}
  end
end
