const express = require("express");
const router = express.Router();

const playerController = require("../controllers/playerController");

router.get("/list/:idPlayer", function  (req, res) {
    playerController.list(req, res);
});

router.post("/authenticate", function  (req, res) {
    playerController.authenticate(req, res);
});

router.post("/save", function (req, res)  {
    playerController.save(req, res);
});

router.put("/update-avatar/:idPlayer", function (req, res)  {
    playerController.updateAvatar(req, res);
});

router.put("/update-nickname/:idPlayer",function  (req, res) {
    playerController.updateNickname(req, res);
});

router.put("/update-title/:idPlayer", function (req, res)  {
    playerController.updateTitle(req, res);
});

router.put("/update-password/:idPlayer", function (req, res) {
    playerController.updatePassword(req, res);
});

module.exports = router;