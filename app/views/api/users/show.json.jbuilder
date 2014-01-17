json.(@user, :id, :fname, :lname)
json.projects do
	json.array!(@projects) do |project|
		json.(project, :title, :description)
	end
end
json.company {json.partial!('api/companies/company', company: @user.company)}