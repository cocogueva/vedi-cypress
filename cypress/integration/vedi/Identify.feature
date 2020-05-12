@feature-tag
Feature: Users can indentify themselve

   I want to identify myself as to the app with my document number 

        @tag-to-include
        Scenario: opening VEDI in google chrome
            Given I acces to the VEDI web
            When I select product "1"
            And I identify myself
            Then  I can authenticate
            