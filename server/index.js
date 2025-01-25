require("dotenv").config();
const app = require("./src/app.js");
const { connectToDatabase } = require("./src/mongodb.js");

const port = process.env.PORT || 5000;

(async () => {
  try {
    await connectToDatabase; 
    console.log("Base de datos sincronizada");
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();
