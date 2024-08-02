// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const queries = require('./queries.js')
// const  port = 5000;

// const app = express()
// app.use(cors())
// app.use(express.json());

// app.get('/',(req,res)=>{
//     return res.json('backend side')
// })
// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'gotestli',
//   database: 'testli',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
  
//   // Connect to the database
// //   db.connect((err) => {
// //     if (err) {
// //       console.error('error connecting: ' + err.stack);
// //       return;
// //     }
// //     console.log('connected as id ' + db.threadId);
// //   });
  
// app.get('/question_master', (req, res) => {
//   db.query(queries.getAllQuestions, (err, data) => {
//     if (err) throw err;
//     res.json(data);
//   });
// });

// app.get('/all_question_options', (req, res) => {
//   db.query(queries.getAllQuestionOptions, (err, data) => {
//     if (err) throw err;
//     res.json(data);
//   });
// });

// app.get('/question_sets/1', (req, res) => {
//   db.query(queries.questionSet1, (err, data) => {
//     if (err) throw err;
//     res.json(data);
//   });
// });

// app.get('/question_sets/2', (req, res) => {
//   db.query(queries.questionSet2, (err, data) => {
//     if (err) throw err;
//     res.json(data);
//   });
// });

// app.get('/all_question_sets', (req, res) => {
//   db.query(queries.getAllQuestionSets, (err, data) => {
//     if (err) throw err;
//     res.json(data);
//   });
// });

// async function getOptions(questionId) {
//   try {
//       const [rows] = await db.execute('SELECT question_option AS options FROM question_options WHERE question_id = ?', [questionId]);
      
//       return rows;
//   } catch (err) {
//       console.error(err);
//       throw err;
//   }
// }

// app.get('/options/:questionId', async (req, res) => {
//   try {
//     const questionId = req.params.questionId;
//     const options = await getOptions(questionId);
//     res.json(options);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

  
//   app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
//   });


const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const queries = require('./queries.js');
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    return res.json('backend side');
});


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'gotestli',
    database: 'testli',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


app.get('/question_master', async (req, res) => {
    try {
        const [rows] = await pool.query(queries.getAllQuestions);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/all_question_options', async (req, res) => {
    try {
        const [rows] = await pool.query(queries.getAllQuestionOptions);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});




app.get('/all_question_sets', async (req, res) => {
    try {
        const [rows] = await pool.query(queries.getAllQuestionSets);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/test-result',async (req,res)=>{
    try {
        const [rows] = await pool.query(queries.getIdofTestResult);
        
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

async function getQuestionSets(id) {
  try {
      const [rows] = await pool.execute('SELECT qsq.question_id, qm.question from testli.question_set_questions qsq, question_set qs , question_master qm where qs.id = ? and qsq.question_set_id = qs.id  and qm.id = qsq.question_id', [id]);
      return rows;
  } catch (err) {
      console.error(err);
      throw err;
  }
}

app.get('/question_sets/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const questionSet = await getQuestionSets(id);
      res.json(questionSet);
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

async function getOptions(questionId) {
    try {
        const [rows] = await pool.execute('SELECT question_option AS options FROM question_options WHERE question_id = ?', [questionId]);
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

app.get('/options/:questionId', async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const options = await getOptions(questionId);
        res.json(options);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

/// post request to store test result data 

app.post('/api/test-result', (req, res) => {
    const { id,userId,questionSetId,totalQuestions,totalAnswered,skippedQuestion,totalReviewed } = req.body;
    //id,user_id,question_set_id,total_question,answered,notAnswered,reviewed,status
   // `id`, `org_id`, `user_id`, `question_set_id`, `total_question`, `total_answered`, `total_not_answered`, `total_reviewed`, `total_not_visited`, `percentage`, `marks_obtained`, `date`, `flag`, `created_by`, `created_date`, `modified_by`, `modified_date`
    const query = 'INSERT INTO user_test_result(`id`, `org_id`, `user_id`, `question_set_id`, `total_question`, `total_answered`, `total_not_answered`, `total_reviewed`, `total_not_visited`, `percentage`, `marks_obtained`, `date`, `flag`, `created_by`, `created_date`, `modified_by`, `modified_date`,`status`) VALUES (?, 1, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, NULL, 17, ?, NULL, NULL, 0)';
    
    const date = new Date().toISOString().slice(0, 10) ; 
  const createdDate = new Date().toISOString().slice(0, 19).replace('T', ' '); 

    pool.query(query, [id,userId,questionSetId,totalQuestions,totalAnswered,skippedQuestion,totalReviewed,date,createdDate], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({msg:'Server error'});
        } else {
            console.log('Query successful:', results);
           res.json({msg:'Selected option inserted successfully',success:true});
        }
    });
});

//// categories
app.get('/categories',async (req,res)=>{
    try {
        const [rows] = await pool.query(queries.getCategories);        
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

/// question_id from question_set_categories
//select question_set_id from question_set_categories where question_set_id = category_id

async function getQuestionSetId(category_id){
    try {
        const [rows] = await pool.execute('select question_set_id from question_set_categories where category_id = ? ', [category_id]);
        return rows;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

app.get('/api/questionset/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        console.log(categoryId)
        const questionSetId = await getQuestionSetId(categoryId);
        console.log(questionSetId)
        res.json(questionSetId);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
