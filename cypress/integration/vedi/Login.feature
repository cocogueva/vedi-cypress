Feature: Bank's active clients login

As a customer I'm able to login using my debit card number and pasword

  Scenario Outline: Bank's customer logs in to VEDI
    Given I acces to the VEDI web
     When I select product "<accountType>"
      And I identify myself with my "<document>"
      And I log in to VEDI with my "<debitCard>" and "<passsword>"
     Then I'm logged so I'm the shit!


    Examples:
      | accountType      | document | debitCard        | passsword |
      #| Cuenta Premio    | 70779259 | 4557885500003739 | 111111    |
      #| Cuenta Ilimitada | 70779263 | 4557885500003747 | 111111    |
      | Cuenta Digital   | 70779274 | 4557885500003804 | 111111    |


      # 43105562 DNI Equifax