class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(params[:user])
    if @user
      login!(@user)
      redirect_to(root_url)
    else
      flash.now[:errors] = "Invalid Email/Password Combination"
      render :new
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:token] = nil
    redirect_to new_session_url
  end
end
