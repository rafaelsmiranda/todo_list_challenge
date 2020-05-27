module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: { allowNull: false, type: DataTypes.STRING },
    email: { allowNull: false, type: DataTypes.STRING },
    password: { allowNull: false, type: DataTypes.STRING },
  })

  return User
}
