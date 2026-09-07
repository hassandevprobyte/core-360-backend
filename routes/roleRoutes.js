const express = require("express");
const router = express.Router();

// Controllers
const roleController = require("../controller/roleController");

router.route("/").get(roleController.getRolesWithPagination).post(roleController.createRole);
router.get("/all", roleController.getAllRoles);
router.get("/resources", roleController.getAllResources);
router.get("/scopes", roleController.getAllScopes);
router.route("/:id").get(roleController.getRoleById).patch(roleController.updateRole).delete(roleController.deleteRole);

module.exports = router;
