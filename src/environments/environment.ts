// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ServerUrl:"https://findev.aaptfin.com/api/",

  // --LOCAL--

  // ng serve --port 4200
  CommonUrl:"http://localhost:4200?TOKEN={TOKEN}&PATH={PATH}",  

   // ng serve --port 54775
  CreditUrl:"http://localhost:54775?TOKEN={TOKEN}&PATH={PATH}",  

  InsuranceUrl:"http://uat.finizoninsurance.com",

   // ng serve --port 57617
  WealthUrl:"http://localhost:57617?TOKEN={TOKEN}&PATH={PATH}",

 // --LOCAL--

  // --UAT FINIZON--

  //CommonUrl:"https://uat.finizon.com",
  //CreditUrl:"https://uat.finizon.com/credit",  
  //InsuranceUrl:"http://uat.finizoninsurance.com",
  //WealthUrl:"https://uat.finizon.com/wealth",

  // --UAT FINIZON--

  // --UAT ONEROOFTECH--

  // CommonUrl:"http://finizon.onerooftechnologies.com/",
  // CreditUrl:"http://finizon-credit.onerooftechnologies.com?TOKEN={TOKEN}&PATH={PATH}",
  // InsuranceUrl:"http://finizon-insurance.onerooftechnologies.com/",
  // WealthUrl:"http://finizon-wealth.onerooftechnologies.com/",

  // --UAT ONEROOFTECH--
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
