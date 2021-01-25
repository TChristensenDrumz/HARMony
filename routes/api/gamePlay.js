const router = require("express").Router();
const gamePlayController = require("../../controllers/gamePlayController");

router.route("/genre")
    .post(gamePlayController.setGenres)

router.route("/:id")
    .get(gamePlayController.getGenre)
    .put(gamePlayController.updateGenre)

module.exports = router;