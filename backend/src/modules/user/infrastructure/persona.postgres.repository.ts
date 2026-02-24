import { pool } from "../../../../config/pg.config.js";
import type { Persona } from "../domain/Persona/Persona.js";
import type { PersonaDatasource } from "../domain/Persona/persona.datasource.js";

export class PersonaPostgresRepository implements PersonaDatasource {
    async registrarNuevaPersona(persona: Persona): Promise<void> {
        await pool.query(`CALL sp_persona_create($1, $2, $3, $4, $5)`,
            [
                persona.id,
                persona.nombre,
                persona.apellidos,
                persona.identificacion,
                persona.fechaNacimiento
            ]
        )
    };

    async editarPersona(persona: Persona): Promise<void> {
        await pool.query(`CALL sp_persona_update($1, $2, $3, $4, $5)`,
            [
                persona.id,
                persona.nombre,
                persona.apellidos,
                persona.identificacion,
                persona.fechaNacimiento
            ])
    }

    async eliminarPersona(id: number): Promise<void> {
        await pool.query(`CALL sp_persona_delete($1)`, [id])
    };

    async listarPersonas(): Promise<Persona[]> {
        const users = await pool.query(
            `SELECT * FROM personas WHERE DELETEAT IS NULL`
        )

        return users.rows
    };

    async buscarPersona(id: number): Promise<Persona> {
        const user = await pool.query(
            `CALL sp_persona_get($1)`, [id]);

        return user.rows[0];
    }
}