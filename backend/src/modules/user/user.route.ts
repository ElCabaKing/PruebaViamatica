import type { Router } from "express";
import multer from "multer";
import { UserController } from "./user.controller.js";
import type { UserRepository } from "./domain/Usuario/user.repository.js";

// multer memory storage for uploads
const upload = multer({ storage: multer.memoryStorage() });

export const createUserRoutes = (
  router: Router,
  usuarioRepository: UserRepository
): Router => {
  const userController = new UserController(usuarioRepository);

  // GET /api/users - Listar todos los usuarios
  router.get("/users", (req, res) => {
    userController.listarUsuarios(req, res);
  });

  // GET /api/users/search - Buscar usuarios con filtros (admin)
  router.get("/users/search", (req, res) => {
    userController.filterUsuarios(req, res);
  });

  // GET /api/users/:id - Obtener un usuario específico
  router.get("/users/:id", (req, res) => {
    userController.obtenerUsuario(req, res);
  });

  // PATCH /api/users/:id/status - Cambiar estado (admin)
  router.patch("/users/:id/status", (req, res) => {
    userController.actualizarEstado(req, res);
  });

  // PUT /api/users/:id - Actualizar usuario
  router.put("/users/:id", (req, res) => {
    userController.actualizarUsuario(req, res);
  });

  // DELETE /api/users/:id - Eliminar usuario
  router.delete("/users/:id", (req, res) => {
    userController.eliminarUsuario(req, res);
  });

  // POST /api/users/upload - Carga masiva de usuarios (archivo csv)
  router.post("/users/upload", upload.single("file"), (req, res) => {
    userController.uploadUsuarios(req, res);
  });

  // GET /api/menu/:userId - Obtener menú según rol
  router.get("/menu/:userId", (req, res) => {
    userController.obtenerMenu(req, res);
  });

  // GET /api/users/:id/blocked - Ver si usuario está bloqueado
  router.get("/users/:id/blocked", (req, res) => {
    userController.estaBloqueado(req, res);
  });

  // GET /api/dashboard - estadísticas para administrador
  router.get("/dashboard", (req, res) => {
    userController.obtenerEstadisticas(req, res);
  });

  return router;
};
