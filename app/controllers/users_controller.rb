class UsersController < ApplicationController

  def create
    @company = Company.find_by_name(params[:user][:company_name])
    if @company
      params[:user][:company_id] = @company.id
      @user = User.new(params[:user])
    else
       @user = User.new(params[:user])
       @user.company = Company.new(name: params[:user][:company_name])
    end

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
