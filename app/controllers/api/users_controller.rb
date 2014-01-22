class Api::UsersController < ApplicationController
  def show
    @user = current_user
    @projects = @user.projects
    respond_to do |format|
      format.json {render 'api/users/show', handles: [:jbuilder]}
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(:photo=>params[:user][:photo])
      render :json => {:photo_url => @user.photo.url}
    else
      render :json => @user.errors.full_messages
    end
  end

end
