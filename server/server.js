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

const dbConfig = {
  host: "localhost", // sql5.freemysqlhosting.net
  user: "root", // sql5723714
  password: "gotestli", //uEB7CCh1Qj
  database: "testli",
};

// const pool = mysql.createPool({
//   connectionLimit:20,
//   host: "localhost", // sql5.freemysqlhosting.net
//   user: "root", // sql5723714
//   password: "gotestli", //uEB7CCh1Qj
//   database: "testli",
// });

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
    const connection = await mysql.createConnection(dbConfig);
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
    await connection.end();
    console.log("Query successful:", results);
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
    const connection = await mysql.createConnection(dbConfig);
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
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT question_option AS correctAnswer FROM question_options WHERE is_correct_answer = 1 AND question_id = ?",
      [questionId]
    );
    await connection.end();
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
// app.post("/api/test/resultdetailsubmit", async(req, res) => {
//   const { userResultId, questionId, correctAnswer, status } = req.body;
//   const connection = await mysql.createConnection(dbConfig);
//   const query =
//     "INSERT INTO `user_test_result_dtl` (`user_test_result_id`, `question_set_question_id`, `question_type`, `answer`, `correct_answer`, `created_by`, `created_date`, `modified_by`, `modified_date`,`status`) VALUES (?, ?, 2, NULL, ?, 10, ?, NULL, NULL,?)";
//   const createdDate = new Date().toISOString().slice(0, 19).replace("T", " ");
//   connection.query(
//     query,
//     [userResultId, questionId, correctAnswer, createdDate, status],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//       } else {
//         console.log("Query successful:", results);
//         res.json({
//           msg: "Selected option inserted successfully",
//           success: true,
//         });
//       }
//     }
//   );
//   await connection.end();
// });

app.post("/api/test/resultdetailsubmit", async (req, res) => {
  const { userResultId, questionId, correctAnswer, status } = req.body;
  const connection = await mysql.createConnection(dbConfig);
  const query =
    "INSERT INTO `user_test_result_dtl` (`user_test_result_id`, `question_set_question_id`, `question_type`, `answer`, `correct_answer`, `created_by`, `created_date`, `modified_by`, `modified_date`,`status`) VALUES (?, ?, 2, NULL, ?, 10, ?, NULL, NULL,?)";
  const createdDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  
  console.log(`Received request: userResultId=${userResultId}, questionId=${questionId}, correctAnswer=${correctAnswer}, status=${status}`);

  connection.query(
    query,
    [userResultId, questionId, correctAnswer, createdDate, status],
    (err, results) => {
      if (err) {
        console.error('Query Error:', err);
        res.status(500).json({ msg: "Server error" });
      } else {
        console.log('Query successful:', results);
        res.json({
          msg: "Selected option inserted successfully",
          success: true,
        });
      }
    }
  );

  await connection.end();
});

app.post("/api/test-result-dtl-submit",async (req, res) => {
  const { id, userId, questionId, findSelectedOption, correctAnswer, status } =
    req.body;
    const connection = await mysql.createConnection(dbConfig);
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
  await connection.end();
});

//// getting status from test_result_dtl

async function getUserResultDtlStatus(userId, questionId) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT status FROM user_test_result_dtl WHERE user_test_result_id = ?  AND question_set_question_id = ? ORDER BY id DESC LIMIT 1",
      [userId, questionId]
    );
    await connection.end();
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

app.get(
  "/api/test/resultdetail/status/:userId/:questionId",
  async (req, res) => {
    const { userId, questionId } = req.params;
    try {
      const options = await getUserResultDtlStatus(userId, questionId);
      console.log(options);
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
  const connection = await mysql.createConnection(dbConfig);
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
        console.log(data);
        console.log("Query successful:", results);
        res.json({
          msg: "Selected option inserted successfully",
          success: true,
        });
      }
    }
  );
  await connection.end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
