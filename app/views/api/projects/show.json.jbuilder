json.(@project,:id, :title, :description)
json.team_members do
	json.array!(@project.team_members) do |team_member|
		json.(team_member, :id, :fname, :lname)
	end
end