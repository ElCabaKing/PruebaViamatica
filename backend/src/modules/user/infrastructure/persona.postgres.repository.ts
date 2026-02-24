import { pool } from "../../../../config/pg.config.js";
import type { Persona } from "../domain/Persona/Persona.js";
import type { PersonaDatasource } from "../domain/Persona/persona.datasource.js";

export class PersonaPostgresRepository implements PersonaDatasource {
    async registrarNuevaPersona(persona: Persona): Promise<number> {
        console.log(persona)
        const res = await pool.query(
            `SELECT sp_persona_create($1, $2, $3, $4) AS id`,
            [
                persona.nombre,
                persona.apellidos,
                persona.identificacion,
                persona.fechaNacimiento
            ]
        );

        return res.rows[0].id;
    };

    async editarPersona(persona: Persona): Promise<void> {
        await pool.query(`SELECT sp_persona_update($1, $2, $3, $4, $5)`,
            [
                persona.id,
                persona.nombre,
                persona.apellidos,
                persona.identificacion,
                persona.fechaNacimiento
            ])
    }

    async eliminarPersona(id: number): Promise<void> {
        await pool.query(`SELECT sp_persona_delete($1)`, [id])
    };

    async listarPersonas(): Promise<Persona[]> {
        const users = await pool.query(
            `SELECT * FROM persona WHERE deleted_at IS NULL`
        )

        return users.rows
    };

    async buscarPersona(id: number): Promise<Persona> {
        const user = await pool.query(
            `SELECT * from persona WHERE id_persona = $1
            and deleted_at IS NULL`, [id]);

        return user.rows[0];
    }

    async buscarPersonas(filters: Record<string, any>): Promise<Persona[]> {
        const conditions: string[] = [];
        const params: any[] = [];
        let idx = 1;
        if (filters.nombre) {
            conditions.push(`nombres ILIKE $${idx++}`);
            params.push(`%${filters.nombre}%`);
        }
        if (filters.apellidos) {
            conditions.push(`apellidos ILIKE $${idx++}`);
            params.push(`%${filters.apellidos}%`);
        }
        if (filters.identificacion) {
            conditions.push(`identificacion = $${idx++}`);
            params.push(filters.identificacion);
        }
        let query = `SELECT * FROM persona WHERE deleted_at IS NULL`;
        if (conditions.length) {
            query += ` AND ` + conditions.join(` AND `);
        }
        const res = await pool.query(query, params);
        return res.rows;
    }
}