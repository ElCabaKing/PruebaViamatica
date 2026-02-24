import type { Router } from "express";
import { PersonaController } from "./persona.controller.js";
import type { PersonaRepository } from "./domain/Persona/persona.repository.js";
import type { RegistarUsuarioUseCase } from "./application/RegistrarUsuario.use-case.js";

export const createPersonaRoutes = (
  router: Router,
  personaRepository: PersonaRepository,
  registarUsuarioUseCase: RegistarUsuarioUseCase
): Router => {
  const personaController = new PersonaController(personaRepository, registarUsuarioUseCase);

  // POST /api/personas - Crear nueva persona
  router.post("/personas", (req, res) => {
    personaController.crearPersona(req, res);
  });

  // GET /api/personas - Listar todas las personas
  router.get("/personas", (req, res) => {
    personaController.listarPersonas(req, res);
  });

  // GET /api/personas/search - Buscar personas con filtros (admin)
  router.get("/personas/search", (req, res) => {
    personaController.buscarPersonas(req, res);
  });

  // GET /api/personas/:id - Obtener una persona específica
  router.get("/personas/:id", (req, res) => {
    personaController.obtenerPersona(req, res);
  });

  // PUT /api/personas/:id - Actualizar persona
  router.put("/personas/:id", (req, res) => {
    personaController.actualizarPersona(req, res);
  });

  // DELETE /api/personas/:id - Eliminar persona
  router.delete("/personas/:id", (req, res) => {
    personaController.eliminarPersona(req, res);
  });

  return router;
};
