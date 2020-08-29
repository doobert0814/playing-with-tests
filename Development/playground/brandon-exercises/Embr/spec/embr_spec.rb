# require 'minitest/autorun'
require_relative 'spec_helper'
require "rspec"
require_relative '../modules/embr.rb'

describe 'App' do
    describe '::new' do
        it 'gets initialized with a name' do
            expect{App.new("Embr")}.to_not raise_error
        end
        it "gets initialized with a profile" do
            expect {}
        end
    end

    describe 'properties'
end
