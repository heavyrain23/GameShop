const express = require("express") /* express is module of node to make routers to database*/
const mysql = require("mysql") /*require mysql in node modules to use it*/
const bodyParser = require("body-parser")

const app = express() /*initialize express*/

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "room483",
  database: "market",
})

app.listen(5000, () => {
  console.log(`App running on port 5000`)
})

app.get("/goods", function (req, res) {
  connection.query("SELECT * FROM goods", function (error, result, fields) {
    if (error) throw error
    console.log(result)
    //send result to response and show it on the webpage
    res.send(result)
  })
})
