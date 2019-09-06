module.exports = function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({ message: "You are not authorized." });
    return;
  }
  next();
};
