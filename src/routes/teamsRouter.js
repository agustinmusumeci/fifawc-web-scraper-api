import { Router } from "express";
import teamsController from "../controllers/teamsController.js";

export const teamsRouter = Router();

teamsRouter.get("/", async (req, res) => {
  try {
    const teamsNames =
      req?.query?.names?.split(",").map((name) => {
        return name.toLowerCase();
      }) ?? [];

    const teams = await teamsController.getTeams(teamsNames);

    return res.status(200).json({ message: "FIFA 2026 World Cup Teams", data: teams, success: true });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong", success: false });
  }
});
