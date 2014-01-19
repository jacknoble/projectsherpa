project = (@project) ? @project : project
json.(project, :id, :title, :description)
json.team_members do
	json.array!(project.team_members) do |team_member|
		json.(team_member, :id, :name, :fname, :lname)
	end
end

json.todo_lists do
	json.array!(project.todo_lists) do |list|
		json.(list, :id, :title, :project_id)
    json.todo_list_items do
      json.array!(list.todo_list_items) do |item|
        json.partial!("api/todo_list_items/todo_list_item", item: item)
      end
    end
  end
end