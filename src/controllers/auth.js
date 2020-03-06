var jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token == null || !token) {
    token = req.headers['authorization'];
    if (token)
      token = token.replace("Bearer ", "");
  }
  if (!token || token == null)
    return res.status(403).send({
      auth: false,
      message: 'No token provided.'
    });
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res.status(401).send({
        auth: false,
        message: 'Failed to authenticate token. '
      });
    // if everything good, save to request for use in other routes 
    console.log("decoded : ", decoded);
    if (req.headers.spaceid)
      req.spaceid = req.headers.spaceid;
    req.userId = decoded.id;
    next();
  });
}

function verifyTokenCode(req, res, next) {
  var token = req.headers['x-access-token'];
  if (token == null || !token) {
    token = req.headers['authorization'];
    token = token.replace("Bearer ", "");
  }
  if (!token || token == null)
    return res.status(403).send({
      auth: false,
      message: 'No token provided.'
    });
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res.status(401).send({
        auth: false,
        message: 'Failed to authenticate token.'
      });
    // if everything good, save to request for use in other routes
    if (!decoded.authenticated) {
      if (!req.body.code)
        return res.status(403).send({
          auth: false,
          message: 'No code provided.'
        });
      req.body.token = token;
      next();
    } else {
      req.account_type = decoded.account_type
      req.spaceid = req.headers.spaceid;
      req.userId = decoded.id;
      next();
    }
  });
}

exports.verifyToken = verifyToken;
exports.verifyCode = verifyTokenCode;