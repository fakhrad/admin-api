var jwt = require("jsonwebtoken");
var async = require('async')
const config = require("../config");
const {
  body,
  validationResult
} = require("express-validator/check");
const {
  sanitizeBody
} = require("express-validator/filter");
const broker = require("./serviceBroker");

exports.getUserSpaces = function (req, res, next) {
  broker.sendRPCMessage({
    spaceId: req.spaceid,
    userId: req.userId,
    body: req.body
  }, 'getuserspaces').then((result) => {
    var obj = JSON.parse(result.toString('utf8'));
    if (!obj.success) {
      if (obj.error)
        return res.status(500).json(obj);
      else {
        res.status(404).json(obj);
      }
    } else {
      res.status(200).json(obj.data);
    }
  });
}

exports.getbyid = function (req, res, next) {
  broker.sendRPCMessage({
    spaceId: req.spaceid,
    userId: req.userId,
    body: {
      id: req.query.id
    }
  }, 'getspacebyid').then((result) => {
    var obj = JSON.parse(result.toString('utf8'));
    if (!obj.success) {
      if (obj.error)
        return res.status(500).json(obj);
      else {
        res.status(404).json(obj);
      }
    } else {
      res.status(200).json(obj.data);
    }
  });
}

exports.add = function (req, res, next) {
  broker.sendRPCMessage({
    spaceId: req.spaceid,
    userId: req.userId,
    body: req.body
  }, 'addspace').then((result) => {
    var obj = JSON.parse(result.toString('utf8'));
    if (!obj.success) {
      if (obj.error)
        return res.status(500).json(obj);
      else {
        res.status(404).json(obj);
      }
    } else {
      res.status(200).json(obj.data);
    }
  });
}

exports.update = function (req, res, next) {
  broker.sendRPCMessage({
    spaceId: req.spaceid,
    userId: req.userId,
    body: req.body
  }, 'updatespace').then((result) => {
    var obj = JSON.parse(result.toString('utf8'));
    if (!obj.success) {
      if (obj.error)
        return res.status(500).json(obj);
      else {
        res.status(404).json(obj);
      }
    } else {
      res.status(200).json(obj.data);
    }
  });
}

exports.remove = function (req, res, next) {
  broker.sendRPCMessage({
    spaceId: req.spaceid,
    userId: req.userId,
    body: req.body
  }, 'removespace').then((result) => {
    var obj = JSON.parse(result.toString('utf8'));
    if (!obj.success) {
      if (obj.error)
        return res.status(500).json(obj);
      else {
        res.status(404).json(obj);
      }
    } else {
      res.status(200).json(obj.data);
    }
  });
}

exports.setlocales = function (req, res, next) {
  broker
    .sendRPCMessage({
      userId: req.userId,
      body: req.body
    }, "setspacelocales")
    .then(result => {
      var obj = JSON.parse(result.toString("utf8"));
      if (!obj.success) {
        if (obj.error) return res.status(500).json(obj);
        else {
          res.status(404).json(obj);
        }
      } else {
        res.status(200).json(obj.data);
      }
    });
};

exports.setroles = function (req, res, next) {
  broker
    .sendRPCMessage({
      userId: req.userId,
      body: req.body
    }, "setspaceroles")
    .then(result => {
      var obj = JSON.parse(result.toString("utf8"));
      if (!obj.success) {
        if (obj.error) return res.status(500).json(obj);
        else {
          res.status(404).json(obj);
        }
      } else {
        res.status(200).json(obj.data);
      }
    });
};
exports.setwebhooks = function (req, res, next) {
  broker
    .sendRPCMessage({
      userId: req.userId,
      body: req.body
    }, "setspacewebhooks")
    .then(result => {
      var obj = JSON.parse(result.toString("utf8"));
      if (!obj.success) {
        if (obj.error) return res.status(500).json(obj);
        else {
          res.status(404).json(obj);
        }
      } else {
        res.status(200).json(obj.data);
      }
    });
};

exports.getwebhooks = function (req, res, next) {
  broker
    .sendRPCMessage({
      userId: req.userId,
      body: {
        id: req.query.id
      }
    },
      "getspacewebhooks"
    )
    .then(result => {
      var obj = JSON.parse(result.toString("utf8"));
      if (!obj.success) {
        if (obj.error) return res.status(500).json(obj);
        else {
          res.status(404).json(obj);
        }
      } else {
        res.status(200).json(obj.data);
      }
    });
};

exports.limits = function (req, res, next) {
  broker
    .sendRPCMessage({
      spaceId: req.spaceid,
      userId: req.userId,
      body: {
        id: req.query.id
      }
    },
      "getspacelimits"
    )
    .then(result => {
      var obj = JSON.parse(result.toString("utf8"));
      if (!obj.success) {
        if (obj.error) return res.status(500).json(obj);
        else {
          res.status(404).json(obj);
        }
      } else {
        res.status(200).json(obj.data);
      }
    });
};

exports.stats = function (req, res, next) {
  async.parallel({
    contents: function (callback) {
      broker
        .sendRPCMessage({
          spaceId: req.spaceid,
          userId: req.userId,
          body: {
            id: req.query.id
          }
        },
          "getstats"
        )
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          callback(undefined, obj);
        });
    },
    apps: function (callback) {
      broker
        .sendRPCMessage({
          spaceId: req.spaceid,
          userId: req.userId,
          body: {
            id: req.query.id
          }
        },
          "getappscount"
        )
        .then(result => {
          var obj = JSON.parse(result.toString("utf8"));
          if (!obj.success) {
            if (obj.error) callback(obj, undefined);
            else {
              callback(obj, undefined);
            }
          } else {
            callback(undefined, obj.data);
          }
        });
    }
  }, (err, results) => {
    if (err && err.length > 0) {
      res.status(500).send(err);
    } else {
      var contents = results.contents;
      contents.apps = results.apps;
      res.status(200).send(contents);
    }
  });

};