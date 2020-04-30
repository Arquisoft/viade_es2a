Feature: List friends

	Scenario: Paco wants to list his friends
		Given Paco has logged in successfully into the application
		When Paco goes to the feed section
		Then Paco can see his three friends
