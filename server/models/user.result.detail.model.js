const sql = require("../config/mysql.db.config");
const queries = require('../queries')

// constructor
const UserResultDetails = function(userresultdetails) {
    this.id = userresultdetails.id;
    this.user_test_result_id = userresultdetails.user_test_result_id;
    this.user_test_result_dtl_question_id = userresultdetails.user_test_result_dtl_question_id;
    this.question_type = userresultdetails.question_type;
    this.answer = userresultdetails.answer;
    this.correct_answer = userresultdetails.correct_answer;
    this.status = userresultdetails.status;
    this.created_by = userresultdetails.created_by;
    this.created_date = userresultdetails.created_date;
    this.modified_by = userresultdetails.modified_by;
    this.modified_date = userresultdetails.modified_date;
};



UserResultDetails.getAnswers = (userResultId, result)=>{
  try {
    sql.query(
      "select answer, correct_answer from user_test_result_dtl where user_test_result_id = ?",
      [userResultId]
    );
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


UserResultDetails.create = (newUserResultDetails, result) => {
  sql.query("INSERT INTO user_test_result_dtl SET ?", newUserResultDetails, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created questionset: ", { id: res.insertId, ...newUserResultDetails });
    result(null, { id: res.insertId, ...newUserResultDetails });
  });
};

UserResultDetails.findById = (id, result) => {
  sql.query(`SELECT * FROM user_test_result_dtl WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found UserResultDetails: ", res);
      result(null, res);
      return;
    }

    // not found UserResultDetails with the id
    result({ kind: "not_found" }, null);
  });
};



UserResultDetails.findUserResultDetailsByUserResultId = (userresultid, result) => {
  sql.query(`SELECT * FROM user_test_result_dtl WHERE user_test_result_id = ${userresultid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found UserResultDetails: ", res);
      result(null, res);
      return;
    }

    // not found UserResultDetails with the id
    result({ kind: "not_found" }, null);
  });
};

UserResultDetails.getAll = (title, result) => {
  let query = "SELECT * FROM user_test_result_dtl";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user_test_result_dtl: ", res);
    result(null, res);
  });
};


UserResultDetails.updateById = (id, questionset, result) => {
  sql.query(
    "UPDATE user_test_result_dtl SET org_id= ?, user_test_result_dtl_url= ? ," + 
            "image= ? ," + 
            "short_desc= ? , description= ? ," + 
            "start_time= ? , end_time= ? ," + 
            "start_date= ? , end_date= ? ," + 
            "time_duration= ? , no_of_question= ? ," + 
            "status_id= ? , is_demo= ? " + 
            "WHERE id = ?",
    [ 
      questionset.org_id, questionset.user_test_result_dtl_url, questionset.image, 
      questionset.short_desc, questionset.description, questionset.start_time ,
      questionset.end_time, questionset.start_date, questionset.end_date ,
      questionset.time_duration, questionset.no_of_question, questionset.status_id ,
      questionset.is_demo ,
      id
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found UserResultDetails with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated questionset: ", { id: id, ...questionset });
      result(null, { id: id, ...questionset });
    }
  );
};

UserResultDetails.remove = (id, result) => {
  sql.query("DELETE FROM user_test_result_dtl WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found UserResultDetails with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted questionset with id: ", id);
    result(null, res);
  });
};

UserResultDetails.removeAll = result => {
  sql.query("DELETE FROM user_test_result_dtl", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user_test_result_dtl`);
    result(null, res);
  });
};

module.exports = UserResultDetails;
