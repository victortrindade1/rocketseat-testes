import { Router } from "express";

// import FoobarController from "./app/controllers/FoobarController";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ message: "O pai tá ON..." });
});

export default routes;
