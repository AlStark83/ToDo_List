const { Router } = require("express");
const getAllUserTasksController = require("../controllers/task/getAllUserTasksController.js");
const createUserTaskController = require("../controllers/task/createUserTaskController.js");
const updateUserTaskController = require("../controllers/task/updateUserTaskController.js");
// const deleteUserTaskController = require("../controllers/task/deleteUserTaskController.js");
const getUserTaskController = require("../controllers/task/getUserTaskController.js");

const taskRouter = Router();

taskRouter
  .get("/", getAllUserTasksController)
  .post("/", createUserTaskController)
  .patch("/:id", updateUserTaskController)
  // .delete("/:id", deleteUserTaskController)
  .get("/:id", getUserTaskController);

module.exports = taskRouter;
