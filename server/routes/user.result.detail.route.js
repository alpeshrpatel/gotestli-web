module.exports = app => {
    const userresultdetails = require("../controller/user.result.details.controller");
  
    var router = require("express").Router();
  
    // Create a new UserResultDetails
    router.post("/", userresultdetails.create);
  
    // Retrieve a single UserResultDetails with id
    router.get("/:id", userresultdetails.findOne);

    // Retrieve a single UserResultDetails with id
    router.get("/userresult/:userresultid", userresultdetails.findUserResultDetailsByUserResultId);
  
    // Update a UserResultDetails with id
    router.put("/:id", userresultdetails.update);
  
    // Delete a UserResultDetails with id
    router.delete("/:id", userresultdetails.delete);
  
    // Delete all UserResultDetails
    router.delete("/", userresultdetails.deleteAll);
  
    app.use('/api/userresultdetails', router);
  };
  