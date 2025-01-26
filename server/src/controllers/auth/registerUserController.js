const User = require("../../models/User");

const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save(); 

    return res.status(201).json({
      message: "User created",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Error registering user", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

module.exports =  registerUserController ;
