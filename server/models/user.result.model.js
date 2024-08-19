const connection = require("../config/mysql.db.config");

// constructor
const UserResult = function(userresult) {
    this.id = userresult.id;
    this.org_id = userresult.org_id;
    this.user_id = userresult.user_id;
    this.question_set_id = userresult.question_set_id;
    this.total_question = userresult.total_question;
    this.total_answered = userresult.total_answered;
    this.total_not_answered = userresult.total_not_answered;
    this.total_reviewed = userresult.total_reviewed;
    this.total_not_visited = userresult.total_not_visited;
    this.percentage = userresult.percentage;
    this.marks_obtained = userresult.marks_obtained;
    this.date = userresult.date;
    this.flag = userresult.flag;
    this.status = userresult.status;
    // this.created_by = userresult.created_by;
    // this.created_date = userresult.created_date;
    // this.modified_by = userresult.modified_by;
    // this.modified_date = userresult.modified_date;
};



UserResult.create = (newUserResult, result) => {
  connection.query("INSERT INTO user_test_result SET ?", newUserResult, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created questionset: ", { id: res.insertId, ...newUserResult });
    result(null, { id: res.insertId, ...newUserResult });
  });
};

UserResult.findById = (id, result) => {
  connection.query(`SELECT * FROM user_test_result WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found questionset: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found UserResultDetails with the id
    result({ kind: "not_found" }, null);
  });
};


UserResult.findByUserId = (user_id, result) => {
  connection.query(`SELECT * FROM user_test_result WHERE user_id = ${user_id} order by created_date asc`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found questionset: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found UserResultDetails with the id
    result({ kind: "not_found" }, null);
  });
};

UserResult.findQuestionSetByUserId = (questionset_id, user_id, result) => {
  connection.query(`SELECT * FROM user_test_result WHERE user_id = ${user_id} and question_set_id = ${questionset_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found questionset: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found UserResultDetails with the id
    result({ kind: "not_found" }, null);
  });
};


UserResult.getAll = (result) => {
  let query = "SELECT * FROM user_test_result";

  connection.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user_test_result: ", res);
    result(null, res);
  });
};


UserResult.updateById = (id, questionset, result) => {
  connection.query(
    "UPDATE user_test_result SET org_id= ?, user_test_result_url= ? ," + 
            "image= ? ," + 
            "short_desc= ? , description= ? ," + 
            "start_time= ? , end_time= ? ," + 
            "start_date= ? , end_date= ? ," + 
            "time_duration= ? , no_of_question= ? ," + 
            "status_id= ? , is_demo= ? " + 
            "WHERE id = ?",
    [ 
      questionset.org_id, questionset.user_test_result_url, questionset.image, 
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

UserResult.remove = (id, result) => {
  connection.query("DELETE FROM user_test_result WHERE id = ?", id, (err, res) => {
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

UserResult.removeAll = result => {
  connection.query("DELETE FROM user_test_result", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user_test_result`);
    result(null, res);
  });
};

module.exports = UserResult;
