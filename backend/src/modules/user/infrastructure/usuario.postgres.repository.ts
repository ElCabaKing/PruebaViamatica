
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

    async buscarUsuarios(filters: Record<string, any>): Promise<Usuario[]> {
        const conditions: string[] = [];
        const params: any[] = [];
        let idx = 1;

        if (filters.username) {
            conditions.push(`username ILIKE $${idx++}`);
            params.push(`%${filters.username}%`);
        }
        if (filters.mail) {
            conditions.push(`mail ILIKE $${idx++}`);
            params.push(`%${filters.mail}%`);
        }
        if (filters.status) {
            conditions.push(`status = $${idx++}`);
            params.push(filters.status);
        }
        if (filters.personaId) {
            conditions.push(`persona_id = $${idx++}`);
            params.push(filters.personaId);
        }

        let queryStr = `SELECT * FROM usuarios WHERE deleted_at IS NULL`;
        if (conditions.length) {
            queryStr += ` AND ` + conditions.join(` AND `);
        }

        const res = await pool.query(queryStr, params);
        return res.rows;
    }

    async actualizarEstado(id: number, status: string): Promise<void> {
        await pool.query(`UPDATE usuarios SET status = $1 WHERE id_usuario = $2`, [status, id]);
    }

    async obtenerEstadisticas(): Promise<{
        total: number;
        activos: number;
        bloqueados: number;
        intentosFallidos: number;
    }> {
        const totalRes = await pool.query(`SELECT COUNT(*) FROM usuarios WHERE deleted_at IS NULL`);
        const activosRes = await pool.query(`SELECT COUNT(*) FROM usuarios WHERE session_active = true AND deleted_at IS NULL`);
        const bloqueadosRes = await pool.query(`SELECT COUNT(*) FROM usuarios WHERE status IN ('0','BL') AND deleted_at IS NULL`);
        const intentosRes = await pool.query(`SELECT SUM(login_tries) FROM usuarios WHERE deleted_at IS NULL`);

        return {
            total: parseInt(totalRes.rows[0].count, 10),
            activos: parseInt(activosRes.rows[0].count, 10),
            bloqueados: parseInt(bloqueadosRes.rows[0].count, 10),
            intentosFallidos: parseInt(intentosRes.rows[0].sum || 0, 10),
        };
    }

    async obtenerMenu(userId: number): Promise<string[]> {
        const res = await pool.query(
            `SELECT ro.nombre_opcion
             FROM rol_usuarios ru
             JOIN rol_rolopciones rro ON ru.rol_id = rro.rol_id
             JOIN rol_opciones ro ON rro.opcion_id = ro.id_opcion
             WHERE ru.usuario_id = $1
               AND ru.deleted_at IS NULL
               AND rro.deleted_at IS NULL
               AND ro.deleted_at IS NULL`,
            [userId]
        );
        return res.rows.map((r: any) => r.nombre_opcion);
    }

}