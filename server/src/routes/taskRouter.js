const { Router } = require("express");
const getAllUserTasksController = require("../controllers/task/getAllUserTasksController.js");
const createUserTaskController = require("../controllers/task/createUserTaskController.js");
const updateTaskController = require("../controllers/task/updateTaskController.js");
const deleteTaskController = require("../controllers/task/deleteTaskController.js");
const getTaskDetailsController = require("../controllers/task/getTaskDetailsController.js");

const taskRouter = Router();

taskRouter
  .get("/", getAllUserTasksController)
  .post("/", createUserTaskController)
  .patch("/:id", updateTaskController)
  .delete("/:id", deleteTaskController)
  .get("/:id", getTaskDetailsController);

module.exports = taskRouter;
