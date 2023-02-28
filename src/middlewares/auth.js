const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

exports.auth = (request, res, next) => {
  try {
    const header = request.headers.authorization;
    let token = header && header.replace("Bearer ", "");

    if (!token) {
      return res.send({
        status: "Failed",
        message: "Access Denied, You Have to login first",
      });
    }

    const verified = jwt.verify(token, secretKey);
    console.log(verified)
    request.userId = verified.id;

    next();
  } catch (error) {
    console.log(111, error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
