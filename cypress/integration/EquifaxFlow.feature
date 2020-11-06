Feature: Open savings account flow

      As a customer I'm able to open a savings account

  Scenario Outline: Bank's customer opens a savings account
    Given I access to the VEDI web
     When I select product "<accountType>"
      And I identify myself with my "<document>"
      And I answer equifax security questions
     Then I can select a currency: "<currency>"
      And I select to use card option: "<cardOption>" and select a place: "<region>","<city>"
     When I insert email "jorgeguevaral@bcp.com.pe", acept the terms and confirm
     Then I will see account creation confirm


    Examples:
      | accountType   | document | currency | cardOption    | region | city  |
      | Cuenta Premio | 43105562 | Dolares  | nueva-tarjeta | CUSCO  | CUSCO |
      #| Cuenta Ilimitada | 70779263 | Dolares  | vincular-tarjeta |
      #| Cuenta Digital   | 70779274 | Dolares  | sin-tarjeta   |