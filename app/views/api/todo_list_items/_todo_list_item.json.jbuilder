item ||= @todo_list_item
comments ||= item.comments
json.(item, :id, :name, :assigned_user_id, :completed, :deadline, :todo_list_id)
json.comments do
  json.array!(comments) do |comment|
    json.(comment, :id)
  end
end