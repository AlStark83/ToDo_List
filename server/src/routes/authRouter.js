const { Router } = require("express");
const loginUserController = require("../controllers/auth/loginUserController.js");
const registerUserController = require("../controllers/auth/registerUserController.js");

const authRouter = Router();

authRouter
	.post("/register", registerUserController)
	.post("/login", loginUserController);

module.exports = authRouter;
