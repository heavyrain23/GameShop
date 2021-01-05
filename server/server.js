const express = require("express"); /* express is module of node to make routers to database*/
const mysql = require("mysql2"); /*require mysql in node modules to use it*/
const app = express(); /*initialize express*/

const connection = mysql.createConnection({
  host: "localhost",
  user: "market",
  password: "room483",
  database: "market",
});

app.listen(5000, () => {
  console.log("App running on port 5000");
  //TODO On server start remove all tables and 
  // create new ones with example data.
});

app.get("/goods", function (req, res) {
  console.log("Fetching all goods...");

  const sql = "SELECT * FROM goods";

  connection.query(sql, function (error, result, fields) {
    
    if (error){
      console.log("Fetching failed!")
      console.log(`We got an error: "${error.message}".`);
      return;
    } 

    console.log("Fetching succeeded!")
    console.log(`Fetched ${result.length} goods.`);

    //send result to response and show it on the webpage
    res.send(result);
  });
});
