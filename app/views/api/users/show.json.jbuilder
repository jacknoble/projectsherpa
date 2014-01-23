json.(@user, :id, :name, :fname, :lname, :company, :photo)
json.projects do
	json.array!(@projects) do |project|
		json.(project, :id, :title)
	end
end
json.company {json.partial!('api/companies/company', company: @user.company)}
