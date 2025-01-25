const { connectToDatabase, getDb } = require("../../mongodb");


const createUserTaskController = async (req, res) => {
	
	const { title, description, user } = req.body;

  try {

    await connectToDatabase();

    const db = getDb(`task_manager_${user}`);

    const result = await db.collection("tasks").insertOne(req.body);
    console.log(result);
    
    res.status(201).json({ message: "Task created", task: result["insertedId"]});
  }
  catch (e) {
    console.error("Error creating task", e);
    res.status(500).json({ message: "Error creating task" });
  }
  
};


module.exports = createUserTaskController;

