import { Router } from "express";
import scoreRoutes from "./score.routes";

const router = Router();

router.use("/scores", scoreRoutes);

export default router;
