const Task = require("../../models/Task")

const getAllUserTaskController = async (req, res) => {

	const userId = req.user.id;
	
	try {
		const tasks = await Task.find({ userId });
		return res.status(200).json(tasks);
	} catch (error) {
		console.error("Error al obtener las tareas del usuario:", error);
		return res
			.status(500)
			.json({ message: "Error al obtener las tareas del usuario" });
	}
};

module.exports = 	getAllUserTaskController;
