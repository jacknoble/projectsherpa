require 'spec_helper'

describe Project do

  context "without incomplete data" do
    let(:invalid_project) {project = Project.new}

    it "validates title" do
      expect(invalid_project).to have_at_least(1).error_on(:title)
    end

    it "validates creator_id" do
      expect(invalid_project).to have_at_least(1).error_on(:creator_id)
    end

  end

  describe Project do
    it { should belong_to(:creator) }
    it { should have_many(:todo_lists)}
  end

end
