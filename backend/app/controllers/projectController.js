const db = require("../models")

//Projects
exports.createProject = async (req, res) => {

  const { title } = req.body

  if (!title) {
    res.status(400).send({ message: "Project title cannot be null" })
    return
  }

  try {
    const project = await db.Project.create({ title, UserId: req.userId })
    res.send(project)
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}

exports.updateProject = async (req, res) => {

  const { title } = req.body
  const { projectId } = req.params

  if (!title) {
    res.status(400).send({ message: "Project title cannot be null" })
    return
  }

  try {
    const project = await db.Project.findOne({ where: { id: projectId, UserId: req.userId } })

    if (!project) {
      res.status(404).send({ message: "Project not found" })
      return
    }

    project.title = title
    project.save()

    res.send(project)
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await db.Project.findAll({ where: { UserId: req.userId }, include: [{ model: db.Task, order: ['id'] }], order: ['id'] })
    res.send(projects)
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}

exports.getProject = async (req, res) => {

  const { projectId } = req.params

  try {
    const project = await db.Project.findOne({ where: { id: projectId, UserId: req.userId }, include: [{ model: db.Task, order: ['id'] }] })

    if (!project) {
      res.status(404).send({ message: "Project not found" })
      return
    }

    res.send(project)
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}

exports.deleteProject = async (req, res) => {

  const { projectId } = req.params

  try {
    const project = await db.Project.findOne({ where: { id: projectId } })

    if (!project) {
      res.status(404).send({ message: "Project not found" })
      return
    }

    project.destroy()
    res.status(204).send()
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}

//Tasks
exports.createTask = async (req, res) => {

  const { description } = req.body
  const { projectId } = req.params

  if (!description) {
    res.status(400).send({ message: "Task description cannot be null" })
    return
  }

  try {
    const project = await db.Project.findOne({ where: { id: projectId, UserId: req.userId } })

    if (!project) {
      res.status(404).send({ message: "Project not found" })
      return
    }

    const task = await db.Task.create({ description, ProjectId: projectId })
    res.send(task)
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}

exports.updateTask = async (req, res) => {

  const { description } = req.body
  const { projectId, taskId } = req.params

  try {
    const task = await db.Task.findOne({ where: { id: taskId, ProjectId: projectId } })

    if (!task) {
      res.status(404).send({ message: "Task not found" })
      return
    }

    if (task.finished) {
      res.status(400).send({ message: "Cannot update a finished task" })
      return
    }

    task.description = description ? description : task.description
    task.save()

    res.send(task)
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}

exports.finishTask = async (req, res) => {

  const { projectId, taskId } = req.params

  try {
    const task = await db.Task.findOne({ where: { id: taskId, ProjectId: projectId } })

    if (!task) {
      res.status(404).send({ message: "Task not found" })
      return
    }

    if (task.finished) {
      res.status(400).send({ message: "Task already finished" })
      return
    }

    task.finished = true
    task.save()

    res.send(task)
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}

exports.deleteTask = async (req, res) => {

  const { projectId, taskId } = req.params

  try {
    const task = await db.Task.findOne({ where: { id: taskId, ProjectId: projectId } })

    if (!task) {
      res.status(404).send({ message: "Task not found" })
      return
    }

    if (task.finished) {
      res.status(400).send({ message: "Cannot delete a finished task" })
      return
    }

    task.destroy()
    res.status(204).send()
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}

exports.getTask = async (req, res) => {

  const { projectId, taskId } = req.params

  try {
    const task = await db.Task.findOne({ where: { id: taskId, ProjectId: projectId } })

    if (!task) {
      res.status(404).send({ message: "Task not found" })
      return
    }

    res.send(task)
  }
  catch (e) {
    res.status(500).send({ message: e.message })
  }
}