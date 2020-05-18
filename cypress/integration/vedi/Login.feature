Feature: Bank's clients login

As a customer I'm able to login using my debit card number and pasword

  Scenario Outline: Bank's customer logs in to VEDI
    Given I acces to the VEDI web
     When I select product "<accountType>"
      And I identify myself with my "<document>"
      And I log in to VEDI with my "<debitCard>" and "<passsword>"
     Then I'm logged so I'm the shit!


    Examples:
      | accountType      | document | debitCard        | passsword |
      | AFP              | 70779207 | 4557885500003531 | 111111    |