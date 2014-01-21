# colors = %w(aquamarine darkorange blueviolet coral burlywood
#  darkgoldedrod chocolate darkorange darkred gold
#  hotpink navy peru seagreen silver)
# project_arr = []
json.array!(@events) do |event|
  json.id event.id
  json.title event.name
  json.start event.deadline
  # project_arr << event.project.id unless project_arr.include?(event.project.id)
 #  json.backgroundColor project_arr.index(event.project.id)
end