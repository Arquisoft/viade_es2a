Feature: Log in

	Scenario: Alex wants to log into the application
		Given Alex has a solid webId
		When Alex opens the application, and logs in
		Then Then Alex can view the welcome screen after having logged in
