Feature: Open checking account flow

      As a customer I'm able to open a checking accounts
  @wip
  Scenario Outline: Bank's customer opens a checking account
    Given I acces to checking account URL
     When I identify myself with my "<document>"
      And I log in to VEDI with my "<debitCard>" and "<passsword>"
     Then I can select a currency, only soles is available
      And I select to use card option: "<cardOption>" and select a place: "<region>","<city>"
     When I insert email "jorgeguevaral@bcp.com.pe", acept the terms and confirm
     Then I will see account creation confirm

    Examples:
      | document | debitCard  | passsword | cardOption  | region | city |
      | 70779207 | 5500003531 | 111111    | sin-tarjeta | LIMA   | LIMA |
      #Clientes Activos
      #| 45451696 | 0550362358 | 123456    | sin-tarjeta |
      #Cliente Equifax
      #| 77037046 | no-card    | -          | sin-tarjeta |
      
      
  #@wip
  Scenario: Bank's customer attemps to open a 2nd checking account
    Given I acces to checking account URL
     When I identify myself with my "70779276"
      And I log in to VEDI with my "5500003812" and "111111"
     Then I would see a pop-up bloqs the flow
