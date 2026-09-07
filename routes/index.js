const express = require("express");
const router = express.Router();

// Middlewares
const protect = require("../middleware/authMiddleware");
const checkPermissions = require("../middleware/checkPermissions");
const queryFilters = require("../middleware/queryFilters");

// Constants
const MODELS = require("../constants/MODELS");

const routes = [
  { path: "/attachments", resource: MODELS.ATTACHMENT, route: require("./attachmentRoutes") },
  { path: "/brands", resource: MODELS.BRAND, route: require("./brandRoutes") },
  { path: "/companies", resource: MODELS.COMPANY, route: require("./companyRoutes") },
  { path: "/picklists", resource: MODELS.PICKLIST, route: require("./picklistRoutes") },
  { path: "/roles", resource: MODELS.ROLE, route: require("./roleRoutes") },
  { path: "/users", resource: MODELS.USER, route: require("./userRoutes") },
];

routes.forEach((route) => {
  const middlewares = [protect];

  if (route.resource) {
    middlewares.push(checkPermissions(route.resource));
    middlewares.push(queryFilters(route.resource));
  }

  router.use(route.path, ...middlewares, route.route);
});

router.use("/auth", require("./authRoutes"));

module.exports = router;
