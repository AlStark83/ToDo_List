const mongoose = require("mongoose");
const Task = require("../../models/Task");

const getTaskDetailsController = async (req, res) => {
  try {

    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findOne({ _id: new mongoose.Types.ObjectId(id), userId });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
    return res.status(500).json({ message: "Error al obtener la tarea" });
  }
};

module.exports = getTaskDetailsController;
