require 'pry'

require_relative '../app/models/embr.rb'
# require_relative '../app/models/instructor.rb'
# require_relative '../app/models/boatingtest.rb'

def reload
  load 'config/environment.rb'
end

embr = App.new("Embr")