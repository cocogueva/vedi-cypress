Feature: Open savings account flow

      As a customer, I want to open a savings account

  Scenario Outline: Bank's customer opens a savings account
    Given I acces to the VEDI web
     When I select product "<accountType>"
      And I identify myself with my "<document>"
      And I log in to VEDI with my "<debitCard>" and "<passsword>"
     Then I can select a currency: "<currency>"
      And I select to use card option: "<cardOption>" and select a place: "<region>","<city>"
     When I insert email "jorgeguevaral@bcp.com.pe", acept the terms and confirm
     Then I will see account creation confirm
      #And I will buy an insurance type "foo"

    Examples:
      | accountType    | document | debitCard  | passsword | currency | cardOption       | region      | city     |
      | Cuenta Premio  | 29623550 | 6000010893 | 111111    | Dolares  | vincular-tarjeta | LAMBAYEQUE  | CHICLAYO |
      | Cuenta Digital | 70779274 | 5500003804 | 111111    | Soles    | nueva-tarjeta    | LA LIBERTAD | TRUJILLO |
      #| Cuenta Ilimitada | 70779263 | 5500003747 | 111111    | Dolares  | nueva-tarjeta |
       
      
      #| Cuenta Premio    | 45451696 | 0550362358 | ******    | Dolares | sin-tarjeta |
      #| Cuenta Ilimitada | 45451696 | 0550362358 | ******    | Soles   | sin-tarjeta |
      #| Cuenta Digital   | 45451696 | 0550362358 | ******    | Soles   | sin-tarjeta |