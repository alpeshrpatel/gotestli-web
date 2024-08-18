const UserResultDetail = require("../models/user.result.detail.model");

// Create and Save a new UserResultDetail
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a UserResultDetail
  const userresultdetail = new UserResultDetail({
    id : req.body.id,
    user_test_result_id : req.body.user_test_result_id,
    question_set_question_id : req.body.question_set_question_id,
    question_type : req.body.question_type,
    answer : req.body.answer,
    correct_answer : req.body.correct_answer,
    status : req.body.status,
    // created_by:req.body.created_by,
    // created_date:req.body.created_date,
    // modified_by:req.body.modified_by,
    // modified_date:req.body.modified_date
  });

  // Save UserResultDetail in the database
  UserResultDetail.create(userresultdetail, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserResultDetail."
      });
    else res.send(data);
  });
};

// Retrieve all UserResultDetail from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  UserResultDetail.findAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userresultdetails."
      });
    else res.send(data);
  });
};

// Find a single UserResultDetail by Id
exports.findOne = (req, res) => {
  console.log("req.params.id : " + req.params.id)
  UserResultDetail.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found UserResultDetail with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving UserResultDetail with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a UserResultDetail identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //console.log(req.body);

  UserResultDetail.updateById(
    req.params.id,
    new UserResultDetail(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found UserResultDetail with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating UserResultDetail with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a UserResultDetail with the specified id in the request
exports.delete = (req, res) => {
  UserResultDetail.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found UserResultDetail with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete UserResultDetail with id " + req.params.id
        });
      }
    } else res.send({ message: `UserResultDetail was deleted successfully!` });
  });
};

// Delete all UserResultDetails from the database.
exports.deleteAll = (req, res) => {
  UserResultDetail.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userresultdetails."
      });
    else res.send({ message: `All UserResultDetails were deleted successfully!` });
  });
};
