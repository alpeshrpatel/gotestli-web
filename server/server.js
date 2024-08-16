const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const queries = require("./queries.js");
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json("backend side");
});

// const pool = require('./config/dbConnection');

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "gotestli",
  port: 3306,
  database: "testli",
  waitForConnections: true,
  connectionLimit: 10,
  keepAliveInitialDelay: 10000, // 0 by default.
  enableKeepAlive: true, // false by default.
});

app.get("/categories", async (req, res) => {
  try {
    const [rows] = await connection.query(queries.getCategories);
    //
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/question_master", async (req, res) => {
  try {
    // //const connection = await mysql.createConnection(dbConfig);
    // connection = await connection.getConnection();
    console.log(queries.getAllQuestions);
    const [rows] = await connection.query(queries.getAllQuestions);
    //
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

async function getQuestion(questionId) {
  try {
    const [rows] = await connection.execute(
      "SELECT question  FROM question_master WHERE id = ?",
      [questionId]
    );

    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get("/api/question_master/:questionId", async (req, res) => {
  try {
    // //const connection = await mysql.createConnection(dbConfig);
    // connection = await connection.getConnection();

    const questionId = req.params.questionId;
    const result = await getQuestion(questionId);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/all_question_options", async (req, res) => {
  try {
    const [rows] = await connection.query(queries.getAllQuestionOptions);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/all_question_sets", async (req, res) => {
  try {
    const [rows] = await connection.query(queries.getAllQuestionSets);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/test-result", async (req, res) => {
  try {
    const [rows] = await connection.query(queries.getIdofTestResult);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/lastId/test-result-dtl", async (req, res) => {
  try {
    const [rows] = await connection.query(queries.getIdofTestResultDtl);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/get/last-question-set-id", async (req, res) => {
  try {
    const [rows] = await connection.query(queries.getIdofQuestionSet);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

async function getQuestionSets(id) {
  try {
    const [rows] = await connection.execute(
      "SELECT qsq.question_id, qm.question from testli.question_set_questions qsq, question_set qs , question_master qm where qs.id = ? and qsq.question_set_id = qs.id  and qm.id = qsq.question_id",
      [id]
    );

    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get("/question_sets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const questionSet = await getQuestionSets(id);
    res.json(questionSet);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

async function getOptions(questionId) {
  try {
    const [rows] = await connection.execute(
      "SELECT question_option AS options FROM question_options WHERE question_id = ?",
      [questionId]
    );

    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get("/options/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const options = await getOptions(questionId);
    res.json(options);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/start/test/result", async (req, res) => {
  const {
    userId,
    questionSetId,
    totalQuestions,
    totalAnswered,
    notAnswered,
    totalReviewed,
    notVisited,
  } = req.body;

  const query =
    "INSERT INTO user_test_result(`org_id`, `user_id`, `question_set_id`, `total_question`, `total_answered`, `total_not_answered`, `total_reviewed`, `total_not_visited`, `percentage`, `marks_obtained`, `date`, `flag`, `created_by`, `created_date`, `modified_by`, `modified_date`,`status`) VALUES (1, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, NULL, 17, ?, NULL, NULL, 0)";

  const date = new Date().toISOString().slice(0, 10);
  const createdDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    const [results] = await connection.query(query, [
      userId,
      questionSetId,
      totalQuestions,
      totalAnswered,
      notAnswered,
      totalReviewed,
      notVisited,
      date,
      createdDate,
    ]);
    res.json({
      msg: "Selected option inserted successfully",
      success: true,
      user_test_result_id: results.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/// submiting quiz on test_result
app.put("/api/put/testresult", async (req, res) => {
  const {
    userResultId,
    questionSetId,
    totalQuestions,
    totalAnswered,
    skippedQuestion,
    totalReviewed,
    marks,
    percentage
  } = req.body;

  const query = `UPDATE user_test_result SET total_answered = ? , total_not_answered = ?, total_reviewed = ? , percentage = ?, marks_obtained = ?, status = 1 WHERE id = ?`
  try {

    const [results] = await connection.query(query, [
      totalAnswered,
      skippedQuestion,
      totalReviewed,
      percentage,
      marks,
      userResultId,
      
    ]);
    console.log(results);
    res.json({
      msg: "Selected option inserted successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }

});

/// getting data to calculate result
async function getPassCriteria(questionSetId){
  try {
    const [rows] = await connection.execute(
      "select totalmarks, pass_percentage from question_set where id = ? ",
      [questionSetId]
    );
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get('/api/get/questionset/passcriteria/:questionSetId',async (req,res)=>{
  try {
    const questionSetId = req.params.questionSetId;
    const result = await getPassCriteria(questionSetId);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})

async function getAnswers(userResultId){
  try {
    const [rows] = await connection.execute(
      "select answer, correct_answer from user_test_result_dtl where user_test_result_id = ?",
      [userResultId]
    );
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get('/api/get/testresult/answers/:userResultId',async (req,res)=>{
  try {
    const userResultId = req.params.userResultId;
    const result = await getAnswers(userResultId);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})

async function getQuestionSetId(category_id) {
  try {
    const [rows] = await connection.execute(
      "select question_set_id from question_set_categories where category_id = ? ",
      [category_id]
    );
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//Done
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
    const [rows] = await connection.execute(
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

app.post("/api/test/resultdetailsubmit", async (req, res) => {
  const { jsonData } = req.body;

  const query =
    "INSERT INTO user_test_result_dtl " +
    "(user_test_result_id, question_set_question_id, question_type, answer, correct_answer, created_by, created_date, modified_by, modified_date, status) " +
    "VALUES (?, ?, 2, NULL, ?, 10, ?, NULL, NULL, ?)";
  const createdDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  try {
    const results = [];

    for (const entry of jsonData) {
      const result = await connection.query(query, [
        entry.userResultId,
        entry.questionId,
        entry.correctAnswer,
        createdDate,
        entry.status,
      ]);
      results.push(result);
    }

    res.status(200).json({ message: "Data inserted successfully", results });
  } catch (error) {
    console.error("Error submitting test result details:", error);
    res.status(500).json({ error: error.message });
  } finally {
    console.log("End of request processing");
  }
});

//// get user_test_result_id

async function getUserResultId(userId, questionSetId) {
  try {
    const [rows] = await connection.query(
      "SELECT id FROM user_test_result WHERE user_id = ? AND question_set_id = ? ORDER BY id DESC LIMIT 1",
      [userId, questionSetId]
    );
    console.log(rows);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get("/api/get/userresultid/:userId/:questionSetId", async (req, res) => {
  const { userId, questionSetId } = req.params;

  try {
    const results = await getUserResultId(userId, questionSetId);
    console.log(results);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/api/update/testresultdtl", async (req, res) => {
  const { userResultId, questionId, findSelectedOption, status } = req.body;
  console.log(findSelectedOption);
  console.log(status);
  console.log(userResultId);
  console.log(questionId);

  const query = `UPDATE user_test_result_dtl 
     SET answer = ?, status = ? 
     WHERE id = (
         SELECT id 
         FROM (
             SELECT id 
             FROM user_test_result_dtl 
             WHERE user_test_result_id = ? AND question_set_question_id = ? 
             ORDER BY id DESC 
             LIMIT 1
         ) AS temp
     )`;

  try {
    const [results] = await connection.query(query, [
      findSelectedOption,
      status,
      userResultId,
      questionId,
    ]);
    console.log(results);
    res.json({
      msg: "Selected option inserted successfully",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/// getting selected options from test_result_dtl

async function getUserResultAnswers(userResultId, length) {
  try {
    const [rows] = await connection.query(
      "SELECT question_set_question_id, answer, status FROM user_test_result_dtl WHERE user_test_result_id = ?  ORDER BY id DESC LIMIT ?",
      [userResultId, length]
    );
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get(
  "/api/get/answers/:userResultId/:questionSetLength",
  async (req, res) => {
    const { userResultId, questionSetLength } = req.params;
    const length = parseInt(questionSetLength);

    try {
      const answers = await getUserResultAnswers(userResultId, length);
      res.json(answers);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//// getting status from test_result_dtl

async function getUserResultDtlStatus(userResultId, questionId) {
  try {
    const [rows] = await connection.execute(
      "SELECT status FROM user_test_result_dtl WHERE user_test_result_id = ?  AND question_set_question_id = ? ORDER BY id DESC LIMIT 1",
      [userResultId, questionId]
    );
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get(
  "/api/update/testresultdtl/status/:userResultId/:questionId",
  async (req, res) => {
    const { userResultId, questionId } = req.params;
    console.log(userResultId, questionId);
    try {
      const options = await getUserResultDtlStatus(userResultId, questionId);

      res.json(options);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

/// storing question set in question_set_questions

app.post("/api/post/questionset", async (req, res) => {
  const { id, questionSetId, questionId } = req.body;

  const query =
    "INSERT INTO `question_set_questions` (`id`, `question_set_id`, `question_id`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES (?, ?, ?, 10, ?, NULL, ?)";
  const createdDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const data = await connection.query(
    query,
    [id, questionSetId, questionId, createdDate, createdDate],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
      } else {
        res.json({
          msg: "Selected option inserted successfully",
          success: true,
        });
        return res;
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
