@GIT.2
Feature: Car Creation
    Background:
        Given I am vistor
        And I have created an event
    Scenario: I can create a car
        When I am on the event page
        And I go to the new car page
        And I type my car name
        And I pick my car seats
        And I type my car meeting
        And I type my car event date
        And I type my phone
        And I type my car details
        And I submit the form 