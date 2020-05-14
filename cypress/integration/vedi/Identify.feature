@feature-tag
Feature: Users can indentify themselve

   I want to identify myself as to the app with my document number 

        @tag-to-include
        Scenario: Bank's customer identifies himself
            Given I acces to the VEDI web
            When I select product "Cuenta Digital"
            And I identify myself with my "45451696"
            Then  VEDI identifies me as "JORGE" and 0
            