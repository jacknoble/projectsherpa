class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name

      t.timestamps
    end

    add_index :companies, :name
    add_column :users, :company_id, :integer
    remove_column :users, :company
  end
end
