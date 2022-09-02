// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ServerUrl: "https://findev.aaptfin.com/api/",

  DGLoginEmail: "finizonuser@finizon.com",
  DGLoginPassword: "test2$",

  // --LOCAL--

  // ng serve --port 4200
  CommonUrl: "http://localhost:4200?TOKEN={TOKEN}&PATH={PATH}&TXN={TXN}&FROM={FROM}&LOGOUT={LOGOUT}",

  // ng serve --port 54775
  CreditUrl: "http://localhost:54775?TOKEN={TOKEN}&PATH={PATH}",

  // ng serve --port 50196
  InsuranceUrl: "http://localhost:50196?TOKEN={TOKEN}&PATH={PATH}",

  // ng serve --port 57617
  WealthUrl: "http://localhost:57617?TOKEN={TOKEN}&PATH={PATH}&DG={DG}",
  ShareUrl: "http://localhost:57617/assisted-share-wealth?FID={FID}&TOKEN={TOKEN}",

  // ng serve --port 50533
  AgentUrl: "http://localhost:50533?ATOKEN={ATOKEN}&PATH={PATH}",

  // ng serve --port 64833
  AgentCommonUrl: "http://localhost:64833?ATOKEN={ATOKEN}&PATH={PATH}",

  // ng serve --port 65099
  AgentInsuranceUrl: "http://localhost:65099?ATOKEN={ATOKEN}&PATH={PATH}",


  // --LOCAL--

  // --UAT FINIZON--

  //CommonUrl:"https://uat.finizon.com?TOKEN={TOKEN}&PATH={PATH}",
  //CreditUrl:"https://uat.finizon.com/credit?TOKEN={TOKEN}&PATH={PATH}",  
  //InsuranceUrl:"http://uat.finizoninsurance.com?TOKEN={TOKEN}&PATH={PATH}",
  //WealthUrl:"https://uat.finizon.com/wealth?TOKEN={TOKEN}&PATH={PATH}&DG={DG}",

  // --UAT FINIZON--


  // --UAT ONEROOFTECH--

  // CommonUrl:"http://finizon.onerooftechnologies.com?TOKEN={TOKEN}&PATH={PATH}",
  // CreditUrl:"http://finizon-credit.onerooftechnologies.com?TOKEN={TOKEN}&PATH={PATH}",
  // InsuranceUrl:"http://finizon-insurance.onerooftechnologies.com?TOKEN={TOKEN}&PATH={PATH}",
  // WealthUrl:"http://finizon-wealth.onerooftechnologies.com?TOKEN={TOKEN}&PATH={PATH}&DG={DG}",

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
