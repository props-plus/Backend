const express = require("express");
const router = express.Router();

const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

// Authentication middleware that makes sure the
// access_token matches with the Auth0 JSON Web Key Set

const verifyToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://propsplus.auth0.com/.well-known/jwks.json`
  }),

  audience: "https://props-plus-dev/",
  issuer: "https://propsplus.auth0.com/",
  algorithms: ["RS256"]
});

router.get("/", verifyToken, (req, res) => {
  res.status(200).json("private route");
});

// Testing admin scope for admin dashboard.

const adminScope = jwtAuthz(["read:messages"]);

router.get("/admin", verifyToken, adminScope, function(req, res) {
  res.json({
    message: "You have admin access."
  });
});

module.exports = router;
