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


const dbConfig = {
  host: "localhost", // sql5.freemysqlhosting.net
  user: "root",       // sql5723714
  password: "gotestli",  //uEB7CCh1Qj
  database: "testli",
};

app.get("/question_master", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(queries.getAllQuestions);
    await connection.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/all_question_options", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(queries.getAllQuestionOptions);
    await connection.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/all_question_sets", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(queries.getAllQuestionSets);
    await connection.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/test-result", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(queries.getIdofTestResult);
    await connection.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/lastId/test-result-dtl", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(queries.getIdofTestResultDtl);
    await connection.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/get/last-question-set-id", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(queries.getIdofQuestionSet);
    await connection.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

async function getQuestionSets(id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT qsq.question_id, qm.question from testli.question_set_questions qsq, question_set qs , question_master qm where qs.id = ? and qsq.question_set_id = qs.id  and qm.id = qsq.question_id",
      [id]
    );
    await connection.end();
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
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT question_option AS options FROM question_options WHERE question_id = ?",
      [questionId]
    );
    await connection.end();
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

app.post("/api/test-result", async (req, res) => {
  const {
    id,
    userId,
    questionSetId,
    totalQuestions,
    totalAnswered,
    skippedQuestion,
    totalReviewed,
  } = req.body;
  const query =
    "INSERT INTO user_test_result(`id`, `org_id`, `user_id`, `question_set_id`, `total_question`, `total_answered`, `total_not_answered`, `total_reviewed`, `total_not_visited`, `percentage`, `marks_obtained`, `date`, `flag`, `created_by`, `created_date`, `modified_by`, `modified_date`,`status`) VALUES (?, 1, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?, NULL, 17, ?, NULL, NULL, 0)";

  const date = new Date().toISOString().slice(0, 10);
  const createdDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.query(query, [
      id,
      userId,
      questionSetId,
      totalQuestions,
      totalAnswered,
      skippedQuestion,
      totalReviewed,
      date,
      createdDate,
    ]);
    await connection.end();
    console.log("Query successful:", results);
    res.json({
      msg: "Selected option inserted successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(queries.getCategories);
    await connection.end();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

async function getQuestionSetId(category_id) {
  try {
    const [rows] = await pool.execute(
      "select question_set_id from question_set_categories where category_id = ? ",
      [category_id]
    );
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get("/api/questionset/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const questionSetId = await getQuestionSetId(categoryId);
    res.json(questionSetId);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/// get correct answer from options table

async function getCorrectAnswer(questionId) {
  try {
    const [rows] = await pool.execute(
      "SELECT question_option AS correctAnswer FROM question_options WHERE is_correct_answer = 1 AND question_id = ?",
      [questionId]
    );
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get("/api/correctanswer/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const options = await getCorrectAnswer(questionId);
    res.json(options);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//// data store in test_result_dtl
app.post("/api/test-result-dtl-submit", (req, res) => {
  const { id, userId, questionId, findSelectedOption, correctAnswer, status } =
    req.body;
  const query =
    "INSERT INTO `user_test_result_dtl` (`id`, `user_test_result_id`, `question_set_question_id`, `question_type`, `answer`, `correct_answer`, `created_by`, `created_date`, `modified_by`, `modified_date`,`status`) VALUES (?, ?, ?, 2, ?, ?, 10, ?, NULL, NULL,?)";
  const createdDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  pool.query(
    query,
    [
      id,
      userId,
      questionId,
      findSelectedOption,
      correctAnswer,
      createdDate,
      status,
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
      } else {
        console.log("Query successful:", results);
        res.json({
          msg: "Selected option inserted successfully",
          success: true,
        });
      }
    }
  );
});

//// getting status from test_result_dtl

async function getUserResultDtlStatus(userId, questionId) {
  try {
    const [rows] = await pool.execute(
      "SELECT status FROM user_test_result_dtl WHERE user_test_result_id = ?  AND question_set_question_id = ? ORDER BY id DESC LIMIT 1",
      [userId, questionId]
    );
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get("/api/test-result-dtl/status/:userId/:questionId", async (req, res) => {
  const { userId, questionId } = req.params;
  try {
    const options = await getUserResultDtlStatus(userId, questionId);
    console.log(options);
    res.json(options);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

/// storing question set in question_set_questions

app.post('/api/post/questionset',async(req,res)=>{
    const {id,questionSetId,questionId} = req.body;
    const query = "INSERT INTO `question_set_questions` (`id`, `question_set_id`, `question_id`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES (?, ?, ?, 10, ?, NULL, ?)";
    const createdDate = new Date().toISOString().slice(0, 19).replace("T", " ");
 const data = await pool.query(
    query,
    [
      id,
      questionSetId,questionId,
      createdDate,createdDate
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
      } else {
        console.log(data);
        console.log("Query successful:", results);
        res.json({
          msg: "Selected option inserted successfully",
          success: true,
        });
      }
    }
)})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
