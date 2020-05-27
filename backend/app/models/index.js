const database = require("../config/database.json")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(database.database, database.username, database.password, database);

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Project = require("./project")(sequelize, Sequelize)
db.Task = require("./task")(sequelize, Sequelize)
db.User = require("./user")(sequelize, Sequelize)

db.User.hasMany(db.Project)
db.Project.belongsTo(db.User)
db.Project.hasMany(db.Task, { onDelete: 'CASCADE' })
db.Task.belongsTo(db.Project)

module.exports = db
