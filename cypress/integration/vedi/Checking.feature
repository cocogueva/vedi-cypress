Feature: Open checking account flow

  As a customer I'm able to open a checking account

  Scenario Outline: Bank's customer opens a checking account
    Given I acces to checking account URL
     When I identify myself with my "<document>"
      And I log in to VEDI with my "<debitCard>" and "<passsword>"
     Then I can select a currency, only soles is available
      And I select to use card option: "<cardOption>" and select a place
     When I insert email "j.guevara@globant.com", acept the terms and confirm
     Then I will see account creation confirm


    Examples:
      | document | debitCard  | passsword | cardOption  |
      #Cliente Activo
      | 45451696 | 0550362358 | 123456    | sin-tarjeta |
      #Cliente Equifax
      #| 70779259 | 4557885500003739 | 111111    |