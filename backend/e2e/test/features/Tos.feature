@GIT.8
Feature: See Tos
    Background:
        Given I am vistor
    Scenario: I can read the Term of Service
        When I am on the homepage
        And I click on the Tos label 
        Then I see the Tos page
