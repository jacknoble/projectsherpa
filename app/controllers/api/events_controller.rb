class Api::EventsController < ApplicationController

  def index
    @events = current_user.assigned_items
    render 'api/events/index'
  end
end
