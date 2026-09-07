const express = require("express");
const router = express.Router();

// Controllers
const brandController = require("../controller/brandController");

// Multer
const uploadMiddleware = require("../middleware/uploadMiddleware");
const upload = uploadMiddleware({
  destination: "public/uploads/brands",
  uploadType: "single",
  field: "file",
});

router.route("/").get(brandController.getBrandsWithPagination).post(upload, brandController.createBrand);
router.get("/all", brandController.getAllBrands);
router.route("/:id").get(brandController.getBrandById).patch(upload, brandController.updateBrand).delete(brandController.deleteBrand);

module.exports = router;
