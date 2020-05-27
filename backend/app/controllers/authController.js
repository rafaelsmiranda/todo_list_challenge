const db = require("../models")
const { secret } = require("../config/jwtsecret.json")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.signup = async (req, res) => {
  const { email, name, password } = req.body
  try {
    const user = await db.User.create({ email, name, password: bcrypt.hashSync(password) })
    res.send({ message: "Registration successfull." })
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}

exports.signin = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.body.email } })

    if (!user) {
      return res.status(401).send({ message: "Invalid combination of email and password." })
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid combination of email and password." })
    }

    var token = jwt.sign({ id: user.id }, secret, { expiresIn: 3600 })

    res.status(200).send({
      accessToken: token,
      user
    })

  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}
