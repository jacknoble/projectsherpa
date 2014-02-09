project = project || @project

json.(project, :id, :title, :description)
json.team_members do
	json.array!(project.team_members) do |team_member|
		json.(team_member, :id, :name, :fname, :lname)
	end
end

json.todo_lists do
	json.array!(project.todo_lists) do |list|
		json.partial!('api/todo_lists/todo_list', :list => list)
  end
end

json.comments(project.comments, :id, :title, :user_id)

json.documents do
  json.array!(project.documents) do |doc|
    json.partial!('api/documents/show', document: doc)
  end
end