class Api::ProjectsController < ApplicationController
  before_filter :require_authentication

  def create
    params[:project][:creator_id] = current_user.id
    team_ids =[]
    params[:project_members].each do |member|
       team_ids << member[:id] if member[:id] != ""
    end
    @project = Project.new(params[:project])
    @project.team_member_ids = team_ids

    if @project.save
      render 'api/projects/show', handles: [:jbuilder]
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
