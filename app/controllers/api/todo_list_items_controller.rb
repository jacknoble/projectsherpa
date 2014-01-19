class Api::TodoListItemsController < ApplicationController

  def create
    @todo_list_item = TodoListItem.new(params[:todo_list_item])
    p @todo_list_item.valid?
    if @todo_list_item.save!
      render :json => @todo_list_item
    else
      render :json => @todo_list_item.errors.full_messages,
      :status => :unprocessable_entity
    end
  end
end
