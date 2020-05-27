module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    title: { allowNull: false, type: DataTypes.STRING },
  })

  return Project
}
