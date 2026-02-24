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

  async filterUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query;
      const users = await this.usuarioRepository.buscarUsuarios(filters as any);
      res.status(200).json(users);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async uploadUsuarios(req: Request, res: Response): Promise<void> {
    try {
      // multer should have stored file in req.file
      const file = (req as any).file;
      if (!file) {
        res.status(400).json({ error: "Archivo no proporcionado" });
        return;
      }
      const content = file.buffer.toString("utf8");
      const lines = content.split(/\r?\n/).filter((l: string) => l.trim());
      for (const line of lines) {
        const [username, password, mail, personaId] = line.split(",");
        if (username && password && mail && personaId) {
          await this.usuarioRepository.registrarNuevoUsuario({
            id: 0,
            username,
            password,
            mail,
            personaId: parseInt(personaId, 10),
            status: "AC"
          } as any);
        }
      }
      res.status(201).json({ mensaje: "Carga masiva completada" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async actualizarEstado(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const usuarioId = parseInt(id as string, 10);
      if (isNaN(usuarioId) || !status) {
        res.status(400).json({ error: "ID o estado inválido" });
        return;
      }
      await this.usuarioRepository.actualizarEstado(usuarioId, status);
      res.status(200).json({ mensaje: "Estado actualizado" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async obtenerMenu(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const uid = parseInt(userId as string, 10);
      if (isNaN(uid)) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }
      const menu = await this.usuarioRepository.obtenerMenu(uid);
      res.status(200).json(menu);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async estaBloqueado(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const uid = parseInt(id as string, 10);
      if (isNaN(uid)) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }
      const usuario = await this.usuarioRepository.buscarUsuario("id", uid);
      if (!usuario) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }
      const blocked = usuario.status !== "AC" && usuario.status !== "1";
      res.status(200).json({ blocked });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async obtenerEstadisticas(req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.usuarioRepository.obtenerEstadisticas();
      res.status(200).json(stats);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }
}

