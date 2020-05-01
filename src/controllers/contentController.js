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

exports.getAll = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body,
        query: req.query
      },
      "getcontents"
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

exports.getById = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: {
          id: req.query.id
        }
      },
      "getcontentbyid"
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

exports.getByLink = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: {
          link: req.query.link
        }
      },
      "getcontentbylink"
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
exports.add = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
      },
      "addcontent"
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

exports.update = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
      },
      "updatecontent"
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

exports.updateandpublish = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
      },
      "partialupdatecontent"
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
exports.remove = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
      },
      "removecontent"
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

exports.removeMany = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
      },
      "removecontentbyfilter"
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
exports.publish = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
      },
      "publishcontent"
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

exports.unPublish = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
      },
      "unpublishcontent"
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

exports.archive = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
      },
      "archivecontent"
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

exports.unArchive = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
      },
      "unarchivecontent"
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

exports.filter = function (req, res, next) {
  console.log(req);
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        query: req.query
      },
      "filtercontents"
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

exports.query = function (req, res, next) {
  console.log(req.query);
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.query
      },
      "querycontents"
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

exports.filterbyrels = function (req, res, next) {
  console.log(req.query);
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        query: req.query
      },
      "getcontentswithrelations"
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

exports.count = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        query: req.query,
        body: req.body
      },
      "getcontentscount"
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

exports.contentsbystatus = function (req, res, next) {
  broker
    .sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        query: req.query,
        body: req.body
      },
      "contentsbystatus"
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

exports.getrecentitems = function (req, res, next) {
  broker.sendRPCMessage({
    spaceId: req.spaceid,
    userId: req.userId,
    query: req.query,
    body: req.body
  }, 'getrecentcontents').then((result) => {
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

exports.getdailyinputs = function (req, res, next) {
  broker.sendRPCMessage({
    spaceId: req.spaceid,
    userId: req.userId,
    query: req.query,
    body: req.body
  }, 'getcontentsdailyinputs').then((result) => {
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