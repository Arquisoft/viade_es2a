Feature: Create new group

	Scenario: Pepa wants to create a new group selecting members
		Given Pepa has a logged in successfully into the application
		When Pepa creates a group selecting his friends webIds
		Then Pepa cannot view the group
