comment ||= @comment
json.(comment, :id, :title, :body, :commentable_type, :commentable_id, :user_id)
json.comments do
  json.array!(comment.comments) do |subcomment|
    json.partial!('api/comments/comment', comment: subcomment)
  end
end
