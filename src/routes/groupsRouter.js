import { Router } from "express";
import groupsController from "../controllers/groupsController.js";

export const groupsRouter = Router();

groupsRouter.get("/", async (req, res) => {
  try {
    const groupsNames =
      req?.query?.groups?.split(",").map((group) => {
        return group.toLowerCase();
      }) ?? [];

    const groups = await groupsController.getGroups(groupsNames);

    return res.status(200).json({ message: "FIFA 2026 World Cup Teams", data: groups, success: true });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong", success: false });
  }
});
