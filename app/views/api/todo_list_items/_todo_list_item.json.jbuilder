item = (@todo_list_item) ? @todo_list_item : item
json.(item, :id, :name, :assigned_user_id, :completed, :deadline, :todo_list_id)