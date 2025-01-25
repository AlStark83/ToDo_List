const { connectToDatabase, getDb } = require("../../mongodb");

const getUserTaskController = async (req, res) => {

  const {user, title} = req.body;
	try {
		await connectToDatabase();
		const db = getDb(`task_manager_${user}`);
		result = await db.collection("tasks").Find({title:title}).toArray();
		console.log(`task_manager_${user}`);
		
		res.status(200).json(result);
	} catch (e) {
		console.error("Error creating task", e);
		res.status(500).json({ message: "Error creating task" });
	}

}

module.exports = getUserTaskController;