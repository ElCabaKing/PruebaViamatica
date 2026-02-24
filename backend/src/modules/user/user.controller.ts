import type { Request, Response } from "express";
import type { UserRepository } from "./domain/Usuario/user.repository.js";

export class UserController {
  constructor(
    private readonly usuarioRepository: UserRepository
  ) {}

  async listarUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await this.usuarioRepository.listarUsuarios();
      res.status(200).json({
        cantidad: usuarios.length,
        usuarios,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async obtenerUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuarioId = parseInt(id as string, 10);

      if (isNaN(usuarioId)) {
        res.status(400).json({ error: "ID de usuario inválido" });
        return;
      }

      const usuario = await this.usuarioRepository.buscarUsuario("id",usuarioId);

      if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      res.status(200).json(usuario);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async actualizarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { username, password, mail, status } = req.body;
      const usuarioId = parseInt(id as string, 10);


      if (isNaN(usuarioId)) {
        res.status(400).json({ error: "ID de usuario inválido" });
        return;
      }

      // Obtener el usuario existente
      const usuarioExistente = await this.usuarioRepository.buscarUsuario("id",usuarioId);

      if (!usuarioExistente) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      // Usar los valores proporcionados o los existentes
      const usuarioActualizado = {
        id: usuarioId,
        username: username || usuarioExistente.username,
        password: password || usuarioExistente.password,
        mail: mail || usuarioExistente.mail,
        personaId: usuarioExistente.personaId,
        status: status || usuarioExistente.status,
      };

      // Actualizar el usuario usando el repositorio
      await this.usuarioRepository.editarUsuario(usuarioActualizado as any);

      res.status(200).json({
        mensaje: "Usuario actualizado exitosamente",
        usuario: usuarioActualizado,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(400).json({ error: message });
    }
  }

  async eliminarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const usuarioId = parseInt(id as string, 10);

      if (isNaN(usuarioId)) {
        res.status(400).json({ error: "ID de usuario inválido" });
        return;
      }

      // Verificar que el usuario existe
      const usuario = await this.usuarioRepository.buscarUsuario("id",usuarioId);

      if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }

      // Eliminar el usuario
      await this.usuarioRepository.eliminarUsuario(usuarioId);

      res.status(200).json({
        mensaje: "Usuario eliminado exitosamente",
        id: usuarioId,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }
}
