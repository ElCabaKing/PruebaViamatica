import { pool } from "../../../../config/pg.config.js";
import type { AuthDatasource } from "../domain/auth/auth.datasource.js";
export class AuthPostgresRepository implements AuthDatasource {
    constructor() { }

    async getSessionActive(id: number): Promise<[]> {
        const res = await pool.query(
            `SELECT * FROM session 
            WHERE usuario_id = $1 AND deleted_at IS NULL`, [id])
        return res.rows[0]
    }

    async saveSessionActive(id: number): Promise<void> {
        const res = await pool.query(
            `SELECT sp_session_create($1, $2)`, [id, new Date()])
        return
    }

    async closeSession(id: number): Promise<void> {
        const res = await pool.query(
            `SELECT sp_session_delete($1, $2)`, [id, new Date()])
        return
    }

    async sumarIntentos(id: number): Promise<void> {
        const tryNumber = await pool.query(
            `SELECT login_tries FROM usuarios WHERE id = $1`, [id])

        if (tryNumber.rows[0].login_tries >= 3) {
            await pool.query(
                `UPDATE usuarios SET status = 0 WHERE id = $1`, [id])
            throw new Error("Usuario bloqueado")
        }
        await pool.query(
            `UPDATE usuarios SET login_tries = login_tries + 1 WHERE id = $1`, [id])
        return
    }


}