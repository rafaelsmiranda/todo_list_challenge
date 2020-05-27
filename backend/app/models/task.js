module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    description: { allowNull: false, type: DataTypes.STRING },
    finished: { allowNull: false, defaultValue: false, type: DataTypes.BOOLEAN }
  })

  return Task
}
