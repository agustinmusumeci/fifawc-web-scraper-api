import { Router } from "express";
import type { Request, Response } from "express";
import stadiumsController from "../controllers/stadiumsController.js";

export const stadiumRouter = Router();

stadiumRouter.get("/", async (req: Request, res: Response) => {
  try {
    const stadiums: Array<{ name: string }> = await stadiumsController.getStadiums();

    return res.status(200).json({ message: "FIFA 2026 World Cup Stadiums", data: stadiums, success: true });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong", success: false });
  }
});
