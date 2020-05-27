const db = require("../models")

checkIfEmailExists = async (req, res, next) => {
  const user = await db.User.findOne({ where: { email: req.body.email } })

  if (user) {
    res.status(400).send({ message: "Email is already in use!" })
    return
  }

  next()
}

module.exports = checkIfEmailExists
