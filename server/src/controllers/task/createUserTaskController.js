const Task = require("../../models/Task")

const createUserTaskController = async (req, res) => {
	try {
		const userId = req.user.id;
		const { title, description, completed, subtasks} = req.body;
		const newTask = await Task.create({ userId, title, description, completed, subtasks});
		return res.status(201).json(newTask);
	} catch (error) {
		console.error("Error creating task:", error);
		return res.status(500).json({ message: "Error creating task" });
	}
};

module.exports = createUserTaskController;