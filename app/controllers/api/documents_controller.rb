class Api::DocumentsController < ApplicationController
  def index
    @project = Project.find.(params[:project_id])
    @documents = @project.documents
    if @documents
      render "api/documents/index"
    else
      render :json => ["Upload failed"], status => 422
    end
  end

  def create
    params[:document][:user_id] = current_user.id
    @document = Document.new(params[:document])
    if @document.save
      render :partial => "api/documents/show"
    else
      render :json => @document.errors.full_messages
    end
  end

  def destroy
    @document = Document.find(params[:id])
    @document.destroy
    render :json => {}
  end

  def show
    @document = Document.find(params[:id])
    if @document
      render 'api/documents/full_show'
    else
      render :json => ["Doc not found"], :status=> 422
    end
  end

  def update
  end
end
