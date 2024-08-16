module.exports = app => {
    const category = require("../controller/category.controller");
  
    var router = require("express").Router();
  
    // Create a new Category
    router.post("/", category.create);
  
    // Retrieve a single Category with id
    router.get("/:id", category.findOne);

    // Retrieve all Category with id
    router.get("/", category.findAll);
  
    // Update a Category with id
    // router.put("/:id", category.update);
  
    // Delete a Category with id
    router.delete("/:id", category.delete);
  
    // Delete all Categorys
    router.delete("/", category.deleteAll);
  
    app.use('/api/category', router);
  };
  