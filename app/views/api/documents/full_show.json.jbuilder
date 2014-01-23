document = document || @document
json.(document, :id, :file, :user_id, :project_id)
json.thumb document.file(:thumb)
json.file_type document.file_content_type
json.comments do
  json.array!(document.comments) do |comment|
    json.partial!('api/comments/comment')
  end
end