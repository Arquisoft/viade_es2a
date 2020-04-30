Feature: Create new group

	Scenario: Pepa wants to view her group information
		Given Pepa has a logged in successfully into the application
		When Pepa creates a group and clicks on its details button
		Then Pepa can view the group members