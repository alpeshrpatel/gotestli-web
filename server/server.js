const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const queries = require('./queries.js')
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
  db.query(queries.getAllQuestions, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

app.get('/all_question_options', (req, res) => {
  db.query(queries.getAllQuestionOptions, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

app.get('/question_sets', (req, res) => {
  db.query(queries.questionSet1, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});

app.get('/all_question_sets', (req, res) => {
  db.query(queries.getAllQuestionSets, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});


  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


