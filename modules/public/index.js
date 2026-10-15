const express = require("express");
const router = express.Router();

// Controllers
const publicController = require("./public.controller");

const routes = [
  {
    path: "/users",
    method: "get",
    middlewares: [],
    controller: publicController.getAllUsers,
  },
];

routes.forEach(({ path, method, middlewares = [], controller }) => {
  router[method](path, ...middlewares, controller);
});

module.exports = router;
