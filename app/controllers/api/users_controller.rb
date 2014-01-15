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
    if @user.update_attributes([params[:user]])
      redirect_to(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

end
