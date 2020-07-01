@GIT.5
Feature: Event Creation
    Background:
        Given I am vistor
        And I have created an event
    Scenario: I see my event detail
        When I am on the event page
        And I go to the event detail page
        Then I see the name of the event
        Then I see the date of the event
        Then I see the address of the event
        Then I see the address map of the event
