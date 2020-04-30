Feature: Delete friends

	Scenario: Paco wants to delete some friends
		Given Paco has logged in successfully into the application
		When Paco deletes each of his friends
		Then Paco cannot see his deleted friends
