Feature: Delete an existing route

	Scenario: Alex wants to delete a route
		Given Alex has a logged in successfully into the application
		When Alex deletes a route
		Then Alex cant view the route on the feed anymore
