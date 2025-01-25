// const task = {
// 	_id: "60b9d3c1e5e3f2c8a0a3a6b6",
// 	user: "Alberto",
// 	title: "Do the laundry",
// 	description: "Wash the clothes and dry them",
// 	status: "Pending",

// 	subtask: [
// 		{
// 			title: "Wash the clothes",
// 			description: "Put the clothes in the washing machine",
// 			status: "Pending",
// 			comments: [{ author: "Alberto", text: "Don't forget to add soap" }],
// 		},
// 		{
// 			title: "Dry the clothes",
// 			description: "Put the clothes in the dryer",
// 			status: "Pending",
// 			comments: [
// 				{
// 					author: "Alberto",
// 					text: "Don't forget to add a dryer sheet",
// 				},
// 			],
// 		},
// 	],
// };

const { connectToDatabase, getDb } = require("../../mongodb");

const getAllUserTaskController = async (req, res) => {
	const {user} = req.body;
	try {
		await connectToDatabase();
		const db = getDb(`task_manager_${user}`);
		result = await db.collection("tasks").find().toArray();
		console.log(`task_manager_${user}`);
		
		res.status(200).json(result);
	} catch (e) {
		console.error("Error creating task", e);
		res.status(500).json({ message: "Error creating task" });
	}
};

module.exports = getAllUserTaskController;
