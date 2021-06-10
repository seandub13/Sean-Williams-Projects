module.exports = app => {
  const Users = require("../controllers/user.controller");
  const Auth =  require('../controllers/auth.controller');

  var router = require("express").Router();

  // Create a new User
  router.post("/", Users.create);

  // Retrieve all Users
  router.get("/", Users.findAll);

  // Retrieve a single User with id
  router.get("/:id", Users.findOne);

  // Retrieve all published Books
  router.get("/admin", Users.findAllAdmin);

  // Update a User with id
  router.put("/:id", Users.update);

  // Delete a User with id
  router.delete("/:id", Users.delete);

  // Delete a user
  router.delete("/", Users.deleteAll);

  app.use("/api/users",Auth.middlewareAuth,router);
//  app.use("/api/users",router);
  app.get("/api/login", Users.login);

};
  