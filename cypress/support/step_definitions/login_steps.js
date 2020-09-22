import {  Then, And } from "cypress-cucumber-preprocessor/steps";
import utils from "../utils/utils";

//Just the assertion previous steps are implemented at common steps.

Then(`I'm logged so I'm the shit!`,() =>{
    
  utils.waitApiTimeout('@login',15000)
  utils.verifyResponseCode('@login',200)  
  utils.verifyURL('/#/seleccion-moneda')
    
});


//rbSoles rbDolares
