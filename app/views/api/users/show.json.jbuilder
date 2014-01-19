json.(@user, :id, :name, :fname, :lname, :company)
json.projects do
	json.array!(@projects) do |project|
		json.partial!('api/projects/project', project: project)
	end
end
json.company {json.partial!('api/companies/company', company: @user.company)}