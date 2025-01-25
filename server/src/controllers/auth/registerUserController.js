const bcrypt = require("bcrypt");
const { connectToDatabase, getDb } = require("../../mongodb");

const registerUserController = async (req, res) => {
	const { name, email, password } = req.body;

	 newuser = await name.replaceAll(" ","").concat(email.replaceAll(" ","").replaceAll("@","").replaceAll(".",""));
	 console.log(newuser);
	 

	try {
		await connectToDatabase();
		const db = getDb("users");

		const user = await db.collection("users").findOne({ user: email });
		if (user) {
			return res.status(409).json({ message: "User already exists" });
		}
    else {
      const hash = await bcrypt.hash(password, 10);
      const result = await db.collection("users").insertOne({ name:name, email: email, user:newuser, password: hash });  
      console.log(result);
      return res.status(201).json({ message: "User created", user: result["insertedId"] });
    }
	} catch (e) {
		console.error("Error finding user", e);
		return res.status(500).json({ message: "Error finding user" });
	}
};

module.exports = registerUserController;
