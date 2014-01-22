class Api::CommentsController < ApplicationController
  def create
    params[:comment][:user_id] = current_user.id
    @commentable = find_commentable(params)
    @comment = @commentable.comments.build(params[:comment])
    if @comment.save
      render :partial => 'api/comments/comment'
    else
      render :json => @comment.errors.full_messages,
      :status => 422
    end
  end

  def index
    @commentable = find_commentable(params)
    @comments = @commentable.comments
    if @comments
      render 'api/comments/index'
    else
      render :json => @comment.errors.full_messages,
      :status => 422
    end
  end

  def show
    @comment = Comment.find(params[:id])
    if @comment
      render :partial => 'api/comments/comment'
    else
      render :json => "Discussion not found"
    end
  end


  private

  def find_commentable(params)
    params.each do |name, value|
      if name =~/(.+)_id$/
        return $1.classify.constantize.find(value) unless name == 'user_id'
      end
    end
  end
end
