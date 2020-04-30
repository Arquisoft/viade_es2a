Feature: Create new route

	Scenario: Pedro wants to create a new route
		Given Pedro has a logged in successfully into the application
		When Pedro creates a route with some points, name and description but without multimedia
		Then Pedro can view the route on the feed
