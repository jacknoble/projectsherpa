company = (@company) ? @company : company

json.(company, :id, :name)
json.employees do
	json.array!(company.employees) do |employee|
		json.(employee, :id, :fname, :lname)
	end
end