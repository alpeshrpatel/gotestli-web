const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const connection = require("./config/mysql.db.config.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to testli-api." });
});


require("./routes/questionset.route.js")(app);
require("./routes/category.route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  connection.getConnection(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL!');
  });
});
// ====================================