Feature: Delete an existing route

	Scenario: Pedro wants to delete a route
		Given Pedro has a logged in successfully into the application
		When Pedro deletes a route
		Then Pedro cant view the route on the feed anymore
