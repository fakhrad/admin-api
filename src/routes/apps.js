var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth');
var clientController = require('../controllers/clientController');
/**
 * @api {get} /apps/api/v1/getall Get all apps for user
 * @apiName GetApps
 * @apiGroup Apps
 *
 *
 * @apiSuccessExample Success Response 
HTTP/1.1 200 OK
{
[
    {
        "_id": "5c24cee9fb6fc00eee871c09",
        "cityCode": "1",
        "name": {
            "fa": "تهران",
            "en": "Tehran"
        }
    },
    {
        "_id": "5c24cf3dfb6fc00eee871d07",
        "cityCode": "2",
        "name": {
            "fa": "اصفهان",
            "en": "Isfahan"
        }
    }
]
}
 *
* @apiErrorExample Servr Error
HTTP/1.1 500 Internal server error
 {
    "success": false,
    "error" : {
       //error details
    }
 }

 */
router.get("/getall", auth.verifyToken, clientController.getclientsbyspaceid);

router.post("/register", auth.verifyToken, clientController.registerclient);

router.delete("/remove", auth.verifyToken, clientController.removeclient);

router.put("/update", auth.verifyToken, clientController.updateclient);
router.get("/info", auth.verifyToken, clientController.getbyid);
router.get("/count", auth.verifyToken, clientController.count);
module.exports = router;