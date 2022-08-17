const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const thoughtRoutes = require("./thoughtsRoutes.js");

router.use("/user", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
