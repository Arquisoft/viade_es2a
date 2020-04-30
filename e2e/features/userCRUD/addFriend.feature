Feature: Add new friend

	Scenario: Paco wants to add new friends
		Given Paco has logged in successfully into the application
		When Paco adds three new friends by introducing their webIds
		Then Paco can view his new friends in his friends list
