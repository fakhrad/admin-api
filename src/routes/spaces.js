var express = require("express");
var router = express.Router();
var auth = require("../controllers/auth");
var controller = require("../controllers/spaceController");

router.get("/getall", auth.verifyToken, controller.getUserSpaces);
router.get("/getbyid", auth.verifyToken, controller.getbyid);
router.post("/add", auth.verifyToken, controller.add);
router.delete("/remove", auth.verifyToken, controller.remove);
router.put("/update", auth.verifyToken, controller.update);
router.put("/setlocales", auth.verifyToken, controller.setlocales);
router.put("/setroles", auth.verifyToken, controller.setroles);
router.put("/setwebhooks", auth.verifyToken, controller.setwebhooks);
router.get("/getwebhooks", auth.verifyToken, controller.getwebhooks);
router.get("/limits", auth.verifyToken, controller.limits);
router.get("/stats", auth.verifyToken, controller.stats);

module.exports = router;