import express, { Application, Request, Response } from "express";
import routes from "./routes/index.routes";

const app: Application = express();
const PORT = 3000;

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Ruta de ejemplo
app.get("/", (req: Request, res: Response) => {
  res.send("¡Hola, mundo desde Express con TypeScript!");
});

app.use("/api", routes); // Use the combined routes

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
