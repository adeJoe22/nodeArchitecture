import express from "express";
import appConfig from "./app";
import dbConfig from "./config/DB";
import environmentVariables from "./config/environmentVariable";

//Instantiate app
const app = express();
// initialize app
appConfig(app);
// initialize DB
dbConfig();

app.listen(environmentVariables.PORT, () => {
  console.log("Server running...");
});
