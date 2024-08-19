module.exports = app => {
    const userresult = require("../controller/user.result.controller");
  
    var router = require("express").Router();
  
    // Create a new QuestionSet
    router.post("/", userresult.create);
  
    // Retrieve a single QuestionSet with id
    router.get("/:id", userresult.findOne);

    // Retrieve a single QuestionSet with id
    router.get("/user/:userid", userresult.findByUserId);

    // Retrieve a single QuestionSet with id
    router.get("/user/:userid/questionset/:questionsetid", userresult.findQuestionSetByUserId);
  
    // Update a QuestionSet with id
    router.put("/:id", userresult.update);
  
    // Delete a QuestionSet with id
    router.delete("/:id", userresult.delete);
  
    // Delete all QuestionSets
    router.delete("/", userresult.deleteAll);
  
    app.use('/api/userresult', router);
  };
  