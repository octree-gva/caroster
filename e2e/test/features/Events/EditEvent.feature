@GIT.12
Feature: Edit an event 
    Background:
        Given I am vistor
        And I have created an event
    Scenario: I see my event detail
        When I am on the event page
        And I go to the event detail page
        And I click edit
        And I see the event edit page
        And I write Edited in event name field
        And I write 2021-01-31 in event date field
        And I write Route des bois in event address field
        And I submit the form
        Then I see event detail page



