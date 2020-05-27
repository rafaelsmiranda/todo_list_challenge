const { decodeToken } = require("../middlewares")
const projectController = require("../controllers/projectController")

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept")
    next()
  })

  app.delete("/project/:projectId", decodeToken, projectController.deleteProject)
  app.delete("/project/:projectId/task/:taskId", decodeToken, projectController.deleteTask)

  app.get("/project", decodeToken, projectController.getAllProjects)
  app.get("/project/:projectId", decodeToken, projectController.getProject)
  app.get("/project/:projectId/task/:taskId", decodeToken, projectController.getTask)

  app.post("/project", decodeToken, projectController.createProject)
  app.post("/project/:projectId/task", decodeToken, projectController.createTask)

  app.put("/project/:projectId", decodeToken, projectController.updateProject)
  app.put("/project/:projectId/task/:taskId", decodeToken, projectController.updateTask)
  app.put("/project/:projectId/task/:taskId/finish", decodeToken, projectController.finishTask)
}
