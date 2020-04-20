Feature: Create new route

	Scenario: Alex wants to create a new route
		Given Alex has a logged in successfully into the application
		When Alex creates a route with some points, name and description but without multimedia
		Then Alex can view the route on the feed
