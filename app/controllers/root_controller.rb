class RootController < ApplicationController
  before_filter :require_authentication
  def root
    render :root
  end
end
