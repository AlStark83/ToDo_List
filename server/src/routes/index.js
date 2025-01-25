const { Router } = require("express");
const authRouter = require("./authRouter.js");
const taskRouter = require("./taskRouter.js");

const mainRouter = Router();

mainRouter
	.get("/", (req, res) => {
		res.send("Hello World");
	})
	.use("/auth", authRouter)
	.use("/tasks", taskRouter);

module.exports = mainRouter;
