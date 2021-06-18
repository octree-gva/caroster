@GIT.6 and @skip
Feature: Car Update
    Background:
        Given I am vistor
        And I have created an event
        And I have created a car
    Scenario: I can update a car
        When I am on the event page
        And I edit my car
        And I write Edited in car name field
        And I pick 6 in car seats field
        And I write Edited in car meeting field
        And I write Edited in car meeting field

        And I type my car name
        And I pick my car seats
        And I type my car meeting
        And I type my car event date
        And I type my phone
        And I type my car details
        And I submit the form 