Feature: Open savings account flow

  As a customer I'm able to open a savings account

  Scenario Outline: Bank's customer opens a savings account
    Given I acces to the VEDI web
     When I select product "<accountType>"
      And I identify myself with my "<document>"
      And I log in to VEDI with my "<debitCard>" and "<passsword>"
     Then I can select a currency: "<currency>"
      And I select to use card option: "<cardOption>" and select a place
     When I insert email "j.guevara@globant.com", acept the terms and confirm
     Then I will see account creation confirm


    Examples:
      | accountType      | document | debitCard  | passsword | currency | cardOption  |
      #| Cuenta Premio    | 70779259 | 5500003739 | 111111    |
      #| Cuenta Ilimitada | 70779263 | 5500003747 | 111111    |
      | Cuenta Digital   | 70779274 | 5500003804 | 111111    | Dolares | sin-tarjeta |
      #| Cuenta Digital   | 45451696 | 0550362358 | 123456    | Soles | sin-tarjeta |