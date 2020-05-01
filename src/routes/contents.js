var express = require("express");
var router = express.Router();
var auth = require("../controllers/auth");
var controller = require("../controllers/contentController");

router.get("/query", auth.verifyToken, controller.query);
router.get("/filterbyrels", auth.verifyToken, controller.filterbyrels);
router.get("/filter", auth.verifyToken, controller.filter);
router.post("/search", auth.verifyToken, controller.getAll);
router.get("/getbyid", auth.verifyToken, controller.getById);
router.get("/getbyبlink", controller.getByLink);

router.post("/add", auth.verifyToken, controller.add);

router.delete("/remove", auth.verifyToken, controller.remove);
router.delete("/removemany", auth.verifyToken, controller.removeMany);

router.put("/update", auth.verifyToken, controller.update);
router.put("/partialupdate", auth.verifyToken, controller.updateandpublish);

router.put("/publish", auth.verifyToken, controller.publish);
router.put("/unpublish", auth.verifyToken, controller.unPublish);
router.put("/archive", auth.verifyToken, controller.archive);
router.put("/unarchive", auth.verifyToken, controller.unArchive);
router.post("/count", auth.verifyToken, controller.count);
router.post("/contentsbystatus", auth.verifyToken, controller.contentsbystatus);
router.post("/recentitems", auth.verifyToken, controller.getrecentitems);
router.post("/dailyinputs", auth.verifyToken, controller.getdailyinputs);
module.exports = router;