const router = require("express").Router();
const gamePlayController = require("../../controllers/gamePlayController");

router.route("/genre")
    .post(gamePlayController.setGenres);

module.exports = router;