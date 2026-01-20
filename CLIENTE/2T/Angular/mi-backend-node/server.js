// Importo als librerías estrictamente necesarias para comunicarme con MySQL, integración con el front y  trabajar con documentos JSON respectivamente
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const apiRoutes = require("./routes/api");

const app = express(); // Iniciamos servicio para conectarnos a MySQL
const PORT = 3000;

app.use(cors()); // Permite peticiones desde Angular
app.use(bodyParser.json()); // Parsea JSON

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`);
});
