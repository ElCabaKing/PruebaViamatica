import { pool } from "../../../../config/pg.config.js";
import type { AuthDatasource } from "../domain/auth/auth.datasource.js";
export class AuthPostgresRepository implements AuthDatasource {
    constructor() { }

    async getSessionActive(id: number): Promise<[]> {
        const res = await pool.query(
            `SELECT * FROM sessions 
            WHERE usuario_id = $1 AND fecha_cierre IS NULL`, [id])
        return res.rows[0]
    }

    async getLastSession(id: number): Promise<any> {
        const res = await pool.query(
            `SELECT * FROM sessions
             WHERE usuario_id = $1
             ORDER BY fecha_ingreso DESC
             LIMIT 1`,
            [id]
        );
        return res.rows[0];
    }

    async saveSessionActive(id: number): Promise<void> {
        const res = await pool.query(
            `SELECT sp_session_create($1)`, [id])
        return
    }

    async closeSession(id: number): Promise<void> {
        const sessionOn = await pool.query(
            `select id_session  from sessions 
 where usuario_id = $1
 and fecha_cierre is  null`, [id])
        const res = await pool.query(
            `SELECT sp_session_close($1)`, [sessionOn.rows[0].id_session])
        return
    }

    async sumarIntentos(id: number): Promise<void> {
        const tryNumber = await pool.query(
            `SELECT login_tries FROM usuarios WHERE id_usuario = $1`, [id]);
        if (!tryNumber.rows[0]) {
            await pool.query(
                `UPDATE usuarios SET login_tries = 1 WHERE id_usuario = $1`, [id])
            return
        }
        if (tryNumber.rows[0].login_tries >= 3) {
            await pool.query(
                `UPDATE usuarios SET status = 0 WHERE id_usuario = $1`, [id])
            throw new Error("Usuario bloqueado")
        }
        await pool.query(
            `UPDATE usuarios SET login_tries = login_tries + 1 WHERE id_usuario = $1`, [id])
        return
    }


}