const jwt = require("jsonwebtoken")
const db = require("../models")
const { secret } = require("../config/jwtsecret.json")

decodeToken = (req, res, next) => {
  // let token = req.headers["x-access-token"]

  // if (!token) {
  //   return res.status(403).send({
  //     message: "Token not provided."
  //   })
  // }

  // jwt.verify(token, secret, (err, decoded) => {
  //   if (err) {
  //     return res.status(401).send({
  //       message: "Access denied."
  //     })
  //   }
  //   req.userId = decoded.id
  //   next()
  // })

  req.userId = 1
  next()
}

module.exports = decodeToken
