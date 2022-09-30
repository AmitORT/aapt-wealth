export const environment = {
  production: false,
  ServerUrl: "https://findev.aaptfin.com/api/",

  DGLoginEmail: "finizonuser@finizon.com",
  DGLoginPassword: "test2$",

  // ng serve --port 4200
  CommonUrl: "http://localhost:4200?TOKEN={TOKEN}&ATOKEN={ATOKEN}&PATH={PATH}&TXN={TXN}&FROM={FROM}&LOGOUT={LOGOUT}",

  // ng serve --port 54775
  CreditUrl: "http://localhost:54775?TOKEN={TOKEN}&PATH={PATH}",

  // ng serve --port 50196
  InsuranceUrl: "http://localhost:50196?TOKEN={TOKEN}&PATH={PATH}",

  // ng serve --port 57617
  WealthUrl: "http://localhost:57617?TOKEN={TOKEN}&PATH={PATH}&DG={DG}",
  ShareUrl: "http://localhost:57617/assisted-share-wealth?FID={FID}&TOKEN={TOKEN}", //ONLY FOR WEALTH PROJECT 

  // ng serve --port 64833
  AgentCommonUrl: "http://localhost:64833?ATOKEN={ATOKEN}&TOKEN={TOKEN}&PATH={PATH}",

  // ng serve --port 65099
  AgentInsuranceUrl: "http://localhost:65099?ATOKEN={ATOKEN}&TOKEN={TOKEN}&PATH={PATH}",

  // ng serve --port 50533
  AgentUrl: "http://localhost:50533?ATOKEN={ATOKEN}&PATH={PATH}",

};

