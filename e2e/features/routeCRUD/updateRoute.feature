Feature: Update route

	Scenario: Alex wants to mofify a route
		Given Alex has a logged in successfully into the application
		When Alex modifies the route
		Then Alex can view the route with the new fields
