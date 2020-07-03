Feature: Open savings account flow

      As a customer I'm able to open a savings account

  Scenario Outline: Bank's customer opens a savings account
    Given I acces to the VEDI web
     When I select product "<accountType>"
      And I identify myself with my "<document>"
      And I answer equifax security questions
     Then I can select a currency: "<currency>"
      And I select to use card option: "<cardOption>" and select a place
     When I insert email "j.guevara@globant.com", acept the terms and confirm
     Then I will see account creation confirm


  Examples:
      | accountType      | document | currency | cardOption    |
      | Cuenta Premio    | 77289270 |  Soles   | nueva-tarjeta |
      #| Cuenta Ilimitada | 70779263 | Dolares  | nueva-tarjeta |
      #| Cuenta Digital   | 70779274 | Dolares  | sin-tarjeta   |