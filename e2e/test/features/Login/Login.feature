Feature: Login
  Background:
    Given I am an administrator

  Scenario: I can login to my dashboard
    When I go to my dashboard
    And I do login
    Then I can see my profile