import type { Request, Response } from "express";
import type { ValidarUsuario } from "./application/ValidarUsuario.use-case.js";
import type { AuthDatasource } from "./domain/auth/auth.datasource.js";
import type { UserRepository } from "./domain/Usuario/user.repository.js";
import { AuthDto } from "./domain/auth/auth.js";
import jwt from "jsonwebtoken";

export class AuthController {
  constructor(
    private readonly validarUsuarioUseCase: ValidarUsuario,
    private readonly authDatasource: AuthDatasource,
    private readonly usuarioRepository: UserRepository
  ) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { criteria, password } = req.body;

      if (criteria === undefined || password === undefined) {
        res.status(400).json({ error: "Faltan criterios o contraseña" });
        return;
      }

      const loginDto = AuthDto.create(criteria, password);
      const user = await this.validarUsuarioUseCase.execute(loginDto);

      // Generar JWT
      const token = jwt.sign(
        { id: user.id_usuario, username: user.username },
        process.env.JWT_SECRET ?? "secret",
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ token, user });
    } catch (error: Error | any) {
        console.log(error.message)
      res.status(400).json({ error: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      if (typeof id !== "number") {
        res.status(400).json({ error: "ID de usuario requerido" });
        return;
      }
      await this.authDatasource.closeSession(id);
      res.cookie("token", "", { httpOnly: true });
      res.status(200).json({ mensaje: "Sesion cerrada" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async recoverPassword(req: Request, res: Response): Promise<void> {
    try {
      const { emailOrUser } = req.body;
      if (!emailOrUser) {
        res.status(400).json({ error: "Email o usuario requerido" });
        return;
      }
      // placeholder: en entorno real se enviaría un correo
      res.status(200).json({ mensaje: "Instrucciones de recuperación enviadas" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async welcome(req: Request, res: Response): Promise<void> {
    try {

      const { id } = req.params;
      const uid = parseInt(id as string, 10);
      if (isNaN(uid)) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }
      const user = await this.usuarioRepository.buscarUsuario("id", uid);
      const session = await this.authDatasource.getLastSession(uid);
      res.status(200).json({ user, lastSession: session });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }

  async getSession(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const uid = parseInt(id as string, 10);
      if (isNaN(uid)) {
        res.status(400).json({ error: "ID inválido" });
        return;
      }
      const session = await this.authDatasource.getSessionActive(uid);
      res.status(200).json(session);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error desconocido";
      res.status(500).json({ error: message });
    }
  }
}
