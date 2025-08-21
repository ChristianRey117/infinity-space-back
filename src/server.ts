import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 3000;

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Ruta de ejemplo
app.get("/", (req: Request, res: Response) => {
  res.send("¡Hola, mundo desde Express con TypeScript!");
});
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`);
});
