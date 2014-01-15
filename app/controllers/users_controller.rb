class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      login!(@user)
      redirect_to (@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
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

  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end
end
