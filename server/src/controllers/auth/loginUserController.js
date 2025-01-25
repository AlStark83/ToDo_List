require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectToDatabase, getDb } = require("../../mongodb");

const loginUserController = async (req, res) => {
	const { email, password } = req.body;

	try {
		await connectToDatabase();
		const db = getDb("users");

		const user = await db.collection("users").findOne({ email: email });


		//TODO : cambiar el mensaje de error a Invalid credentials 
		if (!user) {
			return res.status(401).json({ message: "User not Found" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign({ name: user.name, user: user.user }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(200).json({ message: "Login successful", token });
	} catch (e) {
		console.error("Error logging in", e);
		res.status(500).json({ message: "Error logging in" });
	}
};

module.exports = loginUserController;
