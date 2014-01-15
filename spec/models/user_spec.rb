require 'spec_helper'

describe User do
  context "without lname, fname, or email" do
    let(:invalid_user) {user = User.new}
    it "validates presence of email" do
      expect(invalid_user).to have_at_least(1).error_on(:email)
    end

    it "validates presence of lname" do
      expect(invalid_user).to have_at_least(1).error_on(:lname)
    end

    it "ensures_session_token" do
      expect(invalid_user).to respond_to(:session_token)
    end


    it "validates presence of fname" do
      expect(invalid_user).to have_at_least(1).error_on(:fname)
    end
  end

  context "password to short" do
    let(:bad_pw_user) {user = User.new(password: "foo")}

    it "validates length of passowrd" do
      expect(bad_pw_user).to have_at_least(1).error_on(:password)
    end
  end

  context "valid user" do
    let(:valid_user) do
      user = User.new(
        email: "bill@groundhogday.com",
        lname: "Murray",
        fname: "Bill",
        password: "themanwhoknewtoolittle"
      )
      user.save
    end

    it "encrypts password so it cannot be accessed" do
      user = User.find_by_email("bill@groundhogday.com")
      expect(user).not_to respond_to(:password)
    end
  end


  describe "associations" do
    it {should have_many(:created_projects)}
  end



end
