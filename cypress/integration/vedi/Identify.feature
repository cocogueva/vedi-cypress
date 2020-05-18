        @feature-tag
Feature: Users can indentify themselve

   I want to identify myself as to the app with my document number 

        @tag-to-include
  Scenario Outline: Bank's customer identifies himself
    Given I acces to the VEDI web
     When I select product "<accountType>"
      And I identify myself with my "<document>"
     Then VEDI identifies me as "<name>" and <path>
    
    Examples:
      | accountType    | document | name        | path |
      | Cuenta Digital | 45451696 | JORGE       | 0    |
      | Cuenta Premio  | 70435376 | JUAN CARLOS | 0    |
        