const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static('public'))
var connection 
if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "rootroot",
      database: "burgers_db"
    })
}
  
  app.get("/", (req, res)=>{
    connection.query("SELECT * FROM burgers;", (err, data)=>{
      if (err) throw err

      console.log(data)

      res.render("index", {burger_data: data})
    })
  })

  app.put("/api/devour",(req, res)=>{
    const queryString = "UPDATE burgers SET devoured = 1 WHERE id="+req.body.id+";" 
    console.log(queryString)
    connection.query(queryString, function(err, results){
      if (err) throw err
      console.log(results)
      res.sendStatus(200)
    })
  })
  app.post("/api/devour",(req, res)=>{
    console.log(req.body)
    const queryString = "INSERT INTO burgers (burger_name, devoured) VALUES (?, ?); "
    console.log(queryString)
    connection.query(queryString,[req.body.name, 0], function(err, results){
      if (err) throw err
      console.log(results)
      res.sendStatus(200)
    });
  })

  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
