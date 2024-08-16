module.exports = app => {
    const questionset = require("../controller/questionset.controller");
  
    var router = require("express").Router();
  
    // Create a new QuestionSet
    router.post("/", questionset.create);
  
    // Retrieve a single QuestionSet with id
    router.get("/:id", questionset.findOne);
  
    // Update a QuestionSet with id
    router.put("/:id", questionset.update);
  
    // Delete a QuestionSet with id
    router.delete("/:id", questionset.delete);
  
    // Delete all QuestionSets
    router.delete("/", questionset.deleteAll);
  
    app.use('/api/questionset', router);
  };
  