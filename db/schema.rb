# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140122074025) do

  create_table "comments", :force => true do |t|
    t.string  "title"
    t.text    "body"
    t.integer "user_id"
    t.integer "commentable_id"
    t.string  "commentable_type"
  end

  create_table "companies", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "companies", ["name"], :name => "index_companies_on_name"

  create_table "projects", :force => true do |t|
    t.string   "title",       :null => false
    t.integer  "creator_id",  :null => false
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "description"
  end

  create_table "team_memberships", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.integer  "project_id", :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "todo_list_items", :force => true do |t|
    t.string   "name",                                :null => false
    t.integer  "assigned_user_id"
    t.datetime "deadline"
    t.boolean  "completed",        :default => false
    t.integer  "todo_list_id"
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
  end

  add_index "todo_list_items", ["assigned_user_id"], :name => "index_todo_list_items_on_assigned_user_id"
  add_index "todo_list_items", ["deadline"], :name => "index_todo_list_items_on_deadline"
  add_index "todo_list_items", ["todo_list_id"], :name => "index_todo_list_items_on_todo_list_id"

  create_table "todo_lists", :force => true do |t|
    t.string   "title",      :null => false
    t.integer  "project_id", :null => false
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "todo_lists", ["project_id"], :name => "index_todo_lists_on_project_id"

  create_table "users", :force => true do |t|
    t.string   "lname",              :null => false
    t.string   "fname",              :null => false
    t.string   "email",              :null => false
    t.string   "password_digest",    :null => false
    t.string   "session_token",      :null => false
    t.string   "photo"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.integer  "company_id"
    t.string   "name",               :null => false
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["session_token"], :name => "index_users_on_session_token"

end
