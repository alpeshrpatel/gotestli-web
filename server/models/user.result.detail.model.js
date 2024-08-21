const connection = require("../config/mysql.db.config");
const queries = require('../queries')
const util = require("../utils/util")

// constructor
const UserResultDetails = function(userresultdetails) {
    this.id = userresultdetails.id;
    this.user_test_result_id = userresultdetails.user_test_result_id;
    this.question_set_question_id = userresultdetails.question_set_question_id;
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
    connection.query(
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
  connection.query("INSERT INTO user_test_result_dtl SET ?", newUserResultDetails, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created userresultdetails: ", { id: res.insertId, ...newUserResultDetails });
    result(null, { id: res.insertId, ...newUserResultDetails });
  });
};

UserResultDetails.findById = (id, result) => {
  connection.query(`SELECT * FROM user_test_result_dtl WHERE id = ${id}`, (err, res) => {
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
  connection.query(`SELECT * FROM user_test_result_dtl WHERE user_test_result_id = ${userresultid}`, (err, res) => {
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

  connection.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user_test_result_dtl: ", res);
    result(null, res);
  });
};


UserResultDetails.updateById = (id, userresultdetails, result) => {
  // console.log("userresultdetails : " + JSON.stringify(userresultdetails));
  const updatestmt =  "UPDATE user_test_result_dtl SET "+
                      "user_test_result_id= ?, "+
                      "question_set_question_id= ? ," + 
                      "question_type= ? , "+ 
                      "answer= ? ," + 
                      "correct_answer= ? , "+
                      "status= ? ," + 
                      "modified_by= ? ,"+
                      "modified_date='" + new Date().toISOString().replace("T"," ").substring(0, 19)+"' "+ 
                      " WHERE id = ?"
  console.log("updatestmt :" + updatestmt);
  connection.query(updatestmt
           ,
          [ 
            userresultdetails.user_test_result_id, 
            userresultdetails.question_set_question_id, 
            userresultdetails.question_type, 
            userresultdetails.answer, 
            userresultdetails.correct_answer, 
            userresultdetails.status ,
            userresultdetails.modified_by, 
            id
          ],
        (err, res) => {
          // console.log(JSON.stringify(res))
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
      }
      console.log(res.affectedRows)

      if (res.affectedRows == 0) {
        // not found UserResultDetails with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated userresultdetails: ", { id: id, ...userresultdetails });
      result(null, { id: id, ...userresultdetails });
    }
  );
  
};

UserResultDetails.remove = (id, result) => {
  connection.query("DELETE FROM user_test_result_dtl WHERE id = ?", id, (err, res) => {
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

    console.log("deleted userresultdetails with id: ", id);
    result(null, res);
  });
};

UserResultDetails.removeAll = result => {
  connection.query("DELETE FROM user_test_result_dtl", (err, res) => {
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
