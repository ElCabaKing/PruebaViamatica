
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
                usuario.id_usuario,
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

    async buscarUsuario(criteria: string, value: string | number): Promise<Usuario> {
        let query = ""
        switch (criteria) {
            case "username":
                query =
                    `SELECT * from usuarios WHERE username = $1
                and deleted_at IS NULL`
                break;
            case "email":
                query =
                    `SELECT * from usuarios WHERE email = $1
                and deleted_at IS NULL`
                break;

            case "id":
                query =
                    `SELECT * from usuarios WHERE id = $1
                and deleted_at IS NULL`
                break;
            default:
                throw new Error("Invalid criteria");
        }

        const user = await pool.query(query, [value]);

        return user.rows[0];

    }

}