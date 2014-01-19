class UsersController < ApplicationController

  def create
    @company = Company.find_or_create_by_name(params[:user][:company_name])
    @user = User.new(params[:user])
    @user.company = @company
    if @user.save
      login!(@user)
      redirect_to (:root)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def new
    @user = User.new
  end

end
