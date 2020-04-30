Feature: Create new group

	Scenario: Pepa wants to create a new group
		Given Pepa has a logged in successfully into the application
		When Pepa creates a group introducing his friends webIds
		Then Pepa cannot view the group
