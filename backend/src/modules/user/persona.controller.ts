import type { Request, Response } from "express";
import type { PersonaRepository } from "./domain/Persona/persona.repository.js";
import { Persona } from "./domain/Persona/Persona.js";
import type { RegistarUsuarioUseCase } from "./application/RegistrarUsuario.use-case.js";

export class PersonaController {
  constructor(
    private readonly personaRepository: PersonaRepository,
    private readonly registarUsuarioUseCase: RegistarUsuarioUseCase
  ) {}

  async crearPersona(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, apellidos, identificacion, fechaNacimiento } = req.body;

      // Validar que los campos requeridos están presentes
      if (!nombre || !apellidos || !identificacion || !fechaNacimiento) {
        res.status(400).json({
          error: "Faltan campos requeridos",
          campos_requeridos: ["nombre", "apellidos", "identificacion", "fechaNacimiento"],
        });
        return;
      }

      // Crear la entidad Persona
      const persona = Persona.create(
        0, // El ID se genera en la base de datos
        nombre,
        apellidos,
        identificacion,
        new Date(fechaNacimiento)
      );

      // Registrar la persona y usuario automáticamente
      await this.registarUsuarioUseCase.execute(persona);

      res.status(201).json({
        mensaje: "Persona y usuario registrados exitosamente",
        nombre,
        apellidos,
        identificacion,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(400).json({ error: message });
    }
  }

  async listarPersonas(req: Request, res: Response): Promise<void> {
    try {
      const personas = await this.personaRepository.listarPersonas();
      res.status(200).json({
        cantidad: personas.length,
        personas,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async buscarPersonas(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query;
      const personas = await (this.personaRepository as any).buscarPersonas(filters);
      res.status(200).json(personas);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async obtenerPersona(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const personaId = parseInt(id as string, 10);

      if (isNaN(personaId)) {
        res.status(400).json({ error: "ID de persona inválido" });
        return;
      }

      const persona = await this.personaRepository.buscarPersona(personaId);

      if (!persona) {
        res.status(404).json({ error: "Persona no encontrada" });
        return;
      }

      res.status(200).json(persona);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async actualizarPersona(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nombre, apellidos, identificacion, fechaNacimiento } = req.body;
      const personaId = parseInt(id as string, 10);

      if (isNaN(personaId)) {
        res.status(400).json({ error: "ID de persona inválido" });
        return;
      }

      // Obtener la persona existente
      const personaExistente = await this.personaRepository.buscarPersona(personaId);

      if (!personaExistente) {
        res.status(404).json({ error: "Persona no encontrada" });
        return;
      }

      // Usar los valores proporcionados o los existentes
      const personaActualizada = Persona.create(
        personaId,
        nombre || personaExistente.nombre,
        apellidos || personaExistente.apellidos,
        identificacion || personaExistente.identificacion,
        fechaNacimiento ? new Date(fechaNacimiento) : personaExistente.fechaNacimiento
      );

      // Actualizar la persona usando el repositorio
      await this.personaRepository.editarPersona(personaActualizada);

      res.status(200).json({
        mensaje: "Persona actualizada exitosamente",
        persona: personaActualizada,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(400).json({ error: message });
    }
  }

  async eliminarPersona(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const personaId = parseInt(id as string, 10);

      if (isNaN(personaId)) {
        res.status(400).json({ error: "ID de persona inválido" });
        return;
      }

      // Verificar que la persona existe
      const persona = await this.personaRepository.buscarPersona(personaId);

      if (!persona) {
        res.status(404).json({ error: "Persona no encontrada" });
        return;
      }

      // Eliminar la persona
      await this.personaRepository.eliminarPersona(personaId);

      res.status(200).json({
        mensaje: "Persona eliminada exitosamente",
        id: personaId,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }
}
