class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.string :comment
      t.references :created_by, foreign_key: { to_table: :users }
      t.references :movie, foreign_key: true
      t.timestamps
    end
  end
end
