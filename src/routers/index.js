const Router = require("express").Router();

Router.get("", (req, res) => {
  res.send("Welcome to FamPay-Assignment");
});

module.exports = Router;