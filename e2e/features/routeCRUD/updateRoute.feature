Feature: Update route

	Scenario: Pedro wants to mofify a route
		Given Pedro has a logged in successfully into the application
		When Pedro modifies the route
		Then Pedro can view the route with the new fields
