const mongoose = require("mongoose");
const Task = require("../../models/Task");

const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { title, description, completed, subtasks } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), userId },
      { title, description, completed, subtasks },
      { new: true } 
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or you are not authorized to update it" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Error updating task" });
  }
};

module.exports = updateTaskController;
