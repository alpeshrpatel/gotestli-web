const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const  port = 5000;
const app = express()
app.use(cors())

app.get('/',(req,res)=>{
    return res.json('backend side')
})
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gotestli',
    database: 'testli'
  });
  
  // Connect to the database
//   db.connect((err) => {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
//     console.log('connected as id ' + db.threadId);
//   });
  
  app.get('/question_master', (req, res) => {
    const sqlQuery = 'SELECT * FROM question_master';
    db.query(sqlQuery, (err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


