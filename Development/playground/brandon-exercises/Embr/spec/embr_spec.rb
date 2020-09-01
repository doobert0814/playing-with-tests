require_relative '../spec/spec_helper.rb'
#require 'rspec'
require_relative '../modules/embr.rb'
require_relative '../modules/profile.rb'



RSpec.describe "App - ::new" do 
    it "create a app class" do
      app = App.new("Embr")
      expect(app.name).to eq("Embr")
    end
  end

RSpec.describe 'Profile - ::new' do 
    describe '@@all' do
        it 'is a class variable set to an empty array' do
            expect(Profile.class_variable_get(:@@all)).to eq([])
        end
    end

    describe '.all' do
        it 'is a class method that returns the @@all class variable' do
        end
    end
end



# describe 'App' do
#     describe '::new' do
#         it 'gets initialized with a name' do
#             expect{App.new("Embr")}.to_not raise_error
#         end
#         it "gets initialized with profiles" do
#             expect {App.new(profile).to_not raise_error}
#         end
#       end
#     end

#     # describe 'properties'
# end
