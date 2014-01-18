json.(project, :id, :title, :description)
json.team_members do
	json.array!(project.team_members) do |team_member|
		json.(team_member, :id, :fname, :lname)
	end
end

json.todo_lists do
	json.array!(project.todo_lists) do |list|
		json.(list, :id, :title, :description, :project_id)
    json.todo_list_items do
      json.array!(list.todo_list_items) do |item|
        json.(item, :id, :name, :assigned_user_id, :completed, :deadline)
      end
    end
  end
end