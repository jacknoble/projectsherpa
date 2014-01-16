class Api::ProjectsController < ApplicationController
  before_filter :require_authentication

  def create
    params[:project][:creator_id] = current_user.id
    @project = Project.new(params[:project])
    if @project.save
      render :json => @project
    else
      render :json => @project.errors.full_messages,
      :stats => :unprocessable_entity
    end
  end

  def index
  end

  def new
  end

end
