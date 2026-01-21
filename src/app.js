import express from "express";
import { groupsRouter } from "./routes/groupsRouter.js";
import { matchesRouter } from "./routes/matchesRouter.js";
import { teamsRouter } from "./routes/teamsRouter.js";

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Base route
app.get("/", (req, res) => {
  res.status(200).json({ message: "FIFA 2026 World Cup API" });
});

// Routers
app.use("/groups", groupsRouter);
app.use("/matches", matchesRouter);
app.use("/teams", teamsRouter);

app.listen(PORT, () => {
  console.log(`Listening to port http://localhost:${PORT} 🏆`);
});
