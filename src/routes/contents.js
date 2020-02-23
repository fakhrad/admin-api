var express = require("express");
var router = express.Router();
var auth = require("../controllers/auth");
var controller = require("../controllers/contentController");

router.get("/query", auth.verifyToken, controller.query);
router.get("/filter", auth.verifyToken, controller.filter);
router.get("/getall", auth.verifyToken, controller.getAll);
router.get("/getbyid", auth.verifyToken, controller.getById);
router.get("/getbylink", controller.getByLink);

router.post("/add", auth.verifyToken, controller.add);

router.delete("/remove", auth.verifyToken, controller.remove);
router.delete("/removemany", auth.verifyToken, controller.removeMany);

router.put("/update", auth.verifyToken, controller.update);

router.put("/publish", auth.verifyToken, controller.publish);
router.put("/unpublish", auth.verifyToken, controller.unPublish);
router.put("/archive", auth.verifyToken, controller.archive);
router.put("/unarchive", auth.verifyToken, controller.unArchive);
router.get("/count", auth.verifyToken, controller.count);
router.get("/contentsbystatus", auth.verifyToken, controller.contentsbystatus);
router.get("/recentitems", auth.verifyToken, controller.getrecentitems);
router.get("/dailyinputs", auth.verifyToken, controller.getdailyinputs);
module.exports = router;