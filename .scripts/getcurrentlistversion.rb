#!/usr/bin/env ruby

require 'net/http'
require 'uri'

def getCurrentGradingListName()
   content = Net::HTTP.get(URI.parse('http://ecfgrading.org.uk/new/menu.php'))
   content[/>.* 20\d\d List</][1..-2]
end

puts getCurrentGradingListName()
