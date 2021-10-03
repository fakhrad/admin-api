var jwt = require("jsonwebtoken");
const config = require("../config");
const {
  body,
  validationResult
} = require("express-validator/check");
const {
  sanitizeBody
} = require("express-validator/filter");
const broker = require("./serviceBroker");

exports.login = [
  //Validate fields
  body("username", "UserName must not be empty")
    .isEmail()
    .withMessage("Invalid email"),
  body("password", "Password must not be empty")
    .isLength({
      min: 8
    })
    .withMessage("Password length must be at least 8 charachters"),
  //Sanitize fields
  sanitizeBody("username")
    .trim()
    .escape(),
  sanitizeBody("password")
    .trim()
    .escape(),
  (req, res, next) => {
    console.log(req.body);
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors.message
      });
      return;
    } else {
      //#region Rabbit Implementation
      broker.sendRPCMessage({
        body: req.body
      }, "adminlogin").then(result => {
        var obj = JSON.parse(result.toString("utf8"));
        console.log(obj);
        if (!obj.success) {
          if (obj.error) return res.status(404).json(obj);
          else return res.status(401).json(obj);
        } else {
          if (obj.data) {
            res.status(200).json({
              success: true,
              access_token: obj.data.access_token,
              account_type: obj.data.account_type
            });
          } else {
            res.status(400).json({});
          }
        }
      });
    }
  }
];

var sendRegisterEmail = function (email, userinfo) {
  console.log(email);

  broker
    .sendRPCMessage({
      body: {
        message: {
          to: email,
          from: "info@reqter.com",
          subject: "Welcome to Reqter",
          text: "Dear Customer,\n\rPlease click on the link below to confirm your email\r\nhttps://admin.reqter.com/verify/" + userinfo.access_token
        }
      }
    },
      "sendEmailMessage"
    )
    .then(result => {
      var obj = JSON.parse(result.toString("utf8"));
      if (!obj.success)
        console.log(
          "Email not sent. Error code : " +
          obj.error +
          " response : " +
          obj.data
        );
      else
        console.log("Registration email successfully sent to " + email);
    });
};

exports.register = [
  //Validate fields
  body("username", "UserName must not be empty")
    .isEmail()
    .withMessage("Invalid email"),
  body("password", "Password must not be empty")
    .isLength({
      min: 8
    })
    .withMessage("Password length must be at least 8 charachters"),
  //Sanitize fields
  sanitizeBody("username")
    .trim()
    .escape(),
  sanitizeBody("password")
    .trim()
    .escape(),
  (req, res, next) => {
    console.log(req.body);
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors.message
      });
      return;
    } else {
      //#region Rabbit Implementation

      console.log("add system user started.");
      console.log(req.body);
      broker
        .sendRPCMessage({
          body: req.body
        }, "adminregister")
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          console.log(obj);
          if (!obj.success) {
            if (obj.error) {
              if (obj.error.code == 11000) {
                console.log(
                  "User : " +
                  req.body.username +
                  " already exists " +
                  JSON.stringify(obj.error)
                );
                obj.error = "User : " + req.body.username + " already exists ";
              }

              return res.status(500).json(obj);
            }
          } else {
            //Send mail here
            sendRegisterEmail(req.body.username, obj.data)
            res.status(201).json(obj.data);
          }
        });
    }
  }
];

exports.add = [
  //Validate fields
  body("username", "UserName must not be empty")
    .isEmail()
    .withMessage("Invalid email"),
  body("password", "Password must not be empty")
    .isLength({
      min: 8
    })
    .withMessage("Password length must be at least 8 charachters"),
  body("role", "Role not assigned"),
  //Sanitize fields
  sanitizeBody("username")
    .trim()
    .escape(),
  sanitizeBody("password")
    .trim()
    .escape(),
  (req, res, next) => {
    console.log(req.body);
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors.message
      });
      return;
    } else {
      //#region Rabbit Implementation

      console.log("add system user started.");
      console.log(req.body);
      broker
        .sendRPCMessage({
          spaceId: req.spaceid,
          userId: req.userId,
          body: req.body
        },
          "adminadduser"
        )
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          console.log(obj);
          if (!obj.success) {
            if (obj.error) {
              if (obj.error.code == 11000) {
                console.log(
                  "User : " +
                  req.body.username +
                  " already exists " +
                  JSON.stringify(obj.error)
                );
                obj.error = "User : " + req.body.username + " already exists ";
              }

              return res.status(500).json(obj);
            }
          } else {
            res.status(201).json(obj.data);
          }
        });
    }
  }
];
exports.changeavatar = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors
      });
      return;
    } else {
      req.body.id = req.userId;
      broker
        .sendRPCMessage({
          body: req.body
        }, "adminchangeavatar")
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) {
              return res.status(500).json(obj);
            }
          } else {
            res.status(200).json(obj.data);
          }
        });
    }
  }
];

exports.changenotification = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors
      });
      return;
    } else {
      req.body.id = req.userId;
      broker
        .sendRPCMessage({
          body: req.body
        }, "adminchangenotification")
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) {
              return res.status(500).json(obj);
            }
          } else {
            res.status(200).json(obj.data);
          }
        });
    }
  }
];

exports.updateprofile = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors
      });
      return;
    } else {
      broker
        .sendRPCMessage({
          spaceId: req.body.spaceId,
          userId: req.userId,
          body: req.body
        },
          "adminupdateprofile"
        )
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) {
              return res.status(500).json(obj);
            }
          } else {
            res.status(200).json(obj.data);
          }
        });
    }
  }
];

exports.deleteAccount = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors
      });
      return;
    } else {
      console.log("add system user started.");
      req.body.id = req.userId;
      broker
        .sendRPCMessage({
          spaceId: req.body.spaceId,
          userId: req.userId,
          body: req.body
        },
          "admindeleteaccount"
        )
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) {
              return res.status(500).json(obj);
            } else {
              return res.status(404).json(obj);
            }
          } else {
            res.status(200).json(obj);
          }
        });
    }
  }
];

exports.findbyemail = [
  // body('username', "Username must not be empty").isEmail().withMessage('Invalid email address.'),
  // body('password', "Password must not be empty").isLength({min : 8}).withMessage('Password length must be at least 8 charachters').isAlphanumeric().withMessage('Password must contain charachters and numbers'),
  // //Sanitize fields
  // sanitizeBody('email').trim().escape(),
  // sanitizeBody('password').trim().escape(),
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors
      });
      return;
    } else {
      console.log("add system user started.");
      broker
        .sendRPCMessage({
          body: req.body
        }, "adminfindbyemail")
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) {
              return res.status(500).json(obj);
            }
          } else {
            res.status(200).json(obj.data);
          }
        });
    }
  }
];

exports.getuserinfo = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors
      });
      return;
    } else {
      broker
        .sendRPCMessage({
          body: {
            id: req.userId
          }
        }, "getadminuserinfo")
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) {
              return res.status(500).json(obj);
            }
          } else {
            res.status(200).json(obj.data);
          }
        });
    }
  }
];

var sendVerifyCode = function (email, code) {
  console.log(email);

  broker
    .sendRPCMessage({
      body: {
        message: {
          to: email,
          from: "info@reqter.com",
          subject: "Reqter activation code",
          text: "Dear Customer,\n\rYour activation code is : " + code.toString()
        }
      }
    },
      "sendEmailMessage"
    )
    .then(result => {
      var obj = JSON.parse(result.toString("utf8"));
      if (!obj.success)
        console.log(
          "Code not sent. Error code : " +
          obj.error +
          " response : " +
          obj.data
        );
      else
        console.log("Code(" + code + ") successfully sent to " + email);
    });
};
var user;
exports.forgotpassword = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors
      });
      return;
    } else {
      user = req.body.username;
      console.log(user);
      res.status(200).json({
        success: true
      });
      broker
        .sendRPCMessage({
          body: req.body
        }, "admingetforgotpasswordtoken")
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) {
              return res.status(500).json(obj);
            }
          } else {
            //Send mail here
            sendVerifyCode(user, obj.data.code)
          }
        });
    }
  }
];

exports.verifyCode = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors
      });
      return;
    } else {
      broker
        .sendRPCMessage({
          body: req.body
        }, "adminverifycode")
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) {
              return res.status(500).json(obj);
            }
          } else {
            //Send mail here
            res.status(200).json(obj);
          }
        });
    }
  }
];

exports.confirmemail = [
  (req, res, next) => {
    console.log(req);
    broker
      .sendRPCMessage({
        body: {
          id: req.userId
        }
      }, "adminconfirmemail")
      .then(result => {
        var obj = JSON.parse(result.toString("utf8"));
        if (!obj.success) {
          if (obj.error) {
            return res.status(500).json(obj);
          }
        } else {
          //Send mail here
          res.status(200).json(obj.data);
        }
      });
  }
];

exports.resetpassword = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors
      });
      return;
    } else {
      broker
        .sendRPCMessage({
          body: {
            id: req.userId,
            newpassword: req.body.newpassword
          }
        },
          "adminresetpassword"
        )
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) {
              return res.status(500).json(obj);
            }
          } else {
            //Send mail here
            res
              .status(200)
              .json({
                message: "Your password changed successfully!"
              });
          }
        });
    }
  }
];

exports.changepassword = [
  (req, res, next) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      //There are errors. send error result
      res.status(400).json({
        success: false,
        error: errors
      });
      return;
    } else {
      req.body.id = req.userId;
      broker
        .sendRPCMessage({
          body: req.body
        }, "adminchangepassword")
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) {
              return res.status(500).json(obj);
            }
          } else {
            //Send mail here
            res
              .status(200)
              .json({
                message: "Your password changed successfully!"
              });
          }
        });
    }
  }
];