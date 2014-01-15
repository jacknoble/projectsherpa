require 'spec_helper'

describe TodoList do
  it {should validate_presence_of(:title)}
  it {should validate_presence_of(:project_id)}
  it {should belong_to(:project)}
end
