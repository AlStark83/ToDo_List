const mongoose = require("mongoose");
const Task = require("../../models/Task");

const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const taskToDelete = await Task.findOne({
      _id: new mongoose.Types.ObjectId(id),
      userId,
    });

    if (!taskToDelete) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!taskToDelete.completed) {
      return res
        .status(400)
        .json({ message: "Cannot delete a task that is not completed" });
    }

    const hasPendingSubtasks = taskToDelete.subtasks.some(
      (subtask) => !subtask.completed
    );

    if (hasPendingSubtasks) {
      return res
        .status(400)
        .json({ message: "Cannot delete a task with pending subtasks" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Task deleted successfully",
      task: deletedTask,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Error deleting task" });
  }
};

module.exports = deleteTaskController;
