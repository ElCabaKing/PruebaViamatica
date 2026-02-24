import type { Router } from "express";
import { AuthController } from "./auth.controller.js";
import type { ValidarUsuario } from "./application/ValidarUsuario.use-case.js";
import type { AuthDatasource } from "./domain/auth/auth.datasource.js";

export const createAuthRoutes = (
  router: Router,
  authController: AuthController
): Router => {
  // POST /api/auth/login
  router.post("/auth/login", (req, res) => {
    authController.login(req, res);
  });

  // POST /api/auth/logout
  router.post("/auth/logout", (req, res) => {
    authController.logout(req, res);
  });

  // GET /api/auth/session/:id
  router.get("/auth/session/:id", (req, res) => {
    authController.getSession(req, res);
  });

  return router;
};
