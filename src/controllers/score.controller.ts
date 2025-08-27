import { Request, Response } from "express";
import scoreService from "../services/score.service";

const scoreController = {
  getAllScores: async (req: Request, res: Response) => {
    try {
      const scores = await scoreService.getAllScores();
      res.json(scores);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },

  getScoreById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const score = await scoreService.getScoreById(id);
      if (score) {
        res.json(score);
      } else {
        res.status(404).send("Score not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },

  createScore: async (req: Request, res: Response) => {
    try {
      const { user_id, points } = req.body;
      const newScoreId = await scoreService.createScore(user_id, points);
      res.status(201).json({ score_id: newScoreId });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },

  updateScore: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { user_id, points } = req.body;
      const updated = await scoreService.updateScore(id, user_id, points);
      if (updated) {
        res.send("Score updated");
      } else {
        res.status(404).send("Score not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },

  deleteScore: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await scoreService.deleteScore(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send("Score not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },
};

export default scoreController;
