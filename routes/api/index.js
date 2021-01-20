const path = require("path");
const router = require("express").Router();
const userRoutes = require("./user");
const gamePlayRoutes = require("./gamePlay");

router.use("/user", userRoutes);
router.use("/gamePlay", gamePlayRoutes);

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  });

  module.exports = router;