list ||= @list
json.(list, :id, :title, :project_id)
json.todo_list_items do
  json.array!(list.todo_list_items) do |item|
    json.partial!("api/todo_list_items/todo_list_item", item: item)
  end
end