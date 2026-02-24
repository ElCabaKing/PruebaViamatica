import type { Router } from "express";
import { UserController } from "./user.controller.js";
import type { UserRepository } from "./domain/Usuario/user.repository.js";

export const createUserRoutes = (
  router: Router,
  usuarioRepository: UserRepository
): Router => {
  const userController = new UserController(usuarioRepository);

  // GET /api/users - Listar todos los usuarios
  router.get("/users", (req, res) => {
    userController.listarUsuarios(req, res);
  });

  // GET /api/users/:id - Obtener un usuario específico
  router.get("/users/:id", (req, res) => {
    userController.obtenerUsuario(req, res);
  });

  // PUT /api/users/:id - Actualizar usuario
  router.put("/users/:id", (req, res) => {
    userController.actualizarUsuario(req, res);
  });

  // DELETE /api/users/:id - Eliminar usuario
  router.delete("/users/:id", (req, res) => {
    userController.eliminarUsuario(req, res);
  });

  return router;
};
