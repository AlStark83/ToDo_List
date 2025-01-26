require("dotenv").config();
const app = require("./src/app.js");
const connectDb = require("./src/mongodb.js");

const PORT = process.env.PORT || 5000;

connectDb()
	.then(() => {
		console.log("Conectado a la base de datos con Mongoose");
		app.listen(PORT, () => {
			console.log(`Servidor corriendo en http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error al conectar con la base de datos:", error);
		process.exit(1);
	});
