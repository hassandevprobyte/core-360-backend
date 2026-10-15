const express = require("express");
const router = express.Router();

// Controllers
const applicationontroller = require("./application.controller");

router.route("/").get(applicationontroller.getApplicationsWithPagination).post(applicationontroller.createApplication);
router.route("/all").get(applicationontroller.getAllApplications);
router.route("/:id").get(applicationontroller.getApplicationById).patch(applicationontroller.updateApplication).delete(applicationontroller.deleteApplication);

module.exports = router;
