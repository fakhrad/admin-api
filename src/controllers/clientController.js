var jwt = require('jsonwebtoken');
const config = require('../config');
const {
    body,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');
const broker = require('./serviceBroker');

exports.getclientsbyspaceid = function (req, res, next) {
    console.log(req.userId)
    broker.sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId
    }, 'getapps').then((result) => {
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
    console.log(req.userId)
    broker.sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: {
            id: req.query.id
        }
    }, 'getappbyid').then((result) => {
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
exports.registerclient = function (req, res, next) {
    console.log(req.body);
    broker.sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
    }, 'registerapp').then((result) => {
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

exports.removeclient = function (req, res, next) {
    broker.sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
    }, 'removeapp').then((result) => {
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

exports.updateclient = function (req, res, next) {
    broker.sendRPCMessage({
        spaceId: req.spaceid,
        userId: req.userId,
        body: req.body
    }, 'updateapp').then((result) => {
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

exports.count = function (req, res, next) {
    broker
        .sendRPCMessage({
                spaceId: req.spaceid,
                userId: req.userId,
                body: req.query
            },
            "getappscount"
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