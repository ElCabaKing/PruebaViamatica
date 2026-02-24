
import { pool } from "../../../../config/pg.config.js";
import type { Usuario } from "../domain/Usuario/Usuario.js";
import type { UserRepository } from "../domain/Usuario/user.repository.js";

export class UsuarioPostgresRepository implements UserRepository {
    async registrarNuevoUsuario(usuario: Usuario): Promise<void> {
        await pool.query(`SELECT sp_usuario_create($1, $2, $3, $4)`,
            [
                usuario.username,
                usuario.password,
                usuario.mail,
                usuario.personaId,
            ]
        )
    };

    async editarUsuario(usuario: Usuario): Promise<void> {
        await pool.query(`SELECT sp_usuario_update($1, $2, $3, $4, $5)`,
            [
                usuario.id,
                usuario.username,
                usuario.password,
                usuario.mail,
                usuario.status
            ])
    }

    async eliminarUsuario(id: number): Promise<void> {
        await pool.query(`SELECT sp_usuario_delete($1)`, [id])
    };

    async listarUsuarios(): Promise<Usuario[]> {
        const users = await pool.query(
            `SELECT * FROM usuarios WHERE deleted_at IS NULL`
        )

        return users.rows
    };

    async buscarUsuario(id: number): Promise<Usuario> {
        const user = await pool.query(
            `SELECT sp_usuario_get($1)`, [id]);

        return user.rows[0];
    }

}