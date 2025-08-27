import { Request, Response, Router } from "express";
import scoreController from "../controllers/score.controller";

const router = Router();

router.get("/", scoreController.getAllScores);

export default router;
