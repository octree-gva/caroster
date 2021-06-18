@GIT.1
Feature: Event Creation
    Background:
        Given I am vistor
    Scenario: I can create an event
        When I am on the homepage
        And I type my event name
        And I type my email
        And I click accept the Tos
        And I submit the form
        And I type my event date
        And I type my event address
        And I submit the form
        Then I see the event page
    
    Scenario: I can see an event I created
        Given I have created an event
        When I am on the event page
        Then I see my event