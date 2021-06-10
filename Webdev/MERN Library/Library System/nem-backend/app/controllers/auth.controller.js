const db = require("../models");
const User = db.users; 

exports.middlewareAuth = (req, res, next) => {
  const id = req.query.id;
  const password = req.query.password;
  User.findById(id)
    .then(data => {
      if (data.password == password) {
        next()
    } else {
        res.status(403).send({
          message:
            err.message || "Bad Password"
        }
        );
      }
    })
    .catch(err => {
      res.status(403).send({
        message:
          err.message || "Unauthorized 403"
      });
    });
}