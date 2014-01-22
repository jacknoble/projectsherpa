json.array!(@comments) do |comment|
  json.(comment, :id, :title, :body, :commentable_type, :commentable_id, :user_id)
end