json.(@user, :id, :fname, :lname, :company)
json.projects do
	json.array!(@projects) do |project|
		json.(project, :title, :description)
	end
end
