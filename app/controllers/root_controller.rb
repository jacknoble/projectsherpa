class RootController < ApplicationController
  before_filter :require_authentication
  def root
  end
end
