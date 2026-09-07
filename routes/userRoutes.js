const express = require("express");
const router = express.Router();

// Controllers
const userController = require("../controller/userController");

router.route("/").get(userController.getUsersWithPagination).post(userController.createUser);
router.get("/all", userController.getAllUsers);
router.route("/:id").get(userController.getUserById).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
