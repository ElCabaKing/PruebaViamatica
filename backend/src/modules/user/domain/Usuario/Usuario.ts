import { Persona } from "../Persona/Persona.js";
export class Usuario {
    public readonly id_usuario: number;
    public readonly username: string;
    public readonly password: string;
    public readonly mail: string;
    public readonly personaId: number;
    public readonly status: string;

    private constructor(
        id_usuario: number,
        username: string,
        password: string,
        mail: string,
        personaId: number,
        status: string
    ) {
        this.id_usuario = id_usuario;
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.personaId = personaId;
        this.status = status
    }

    static create(
        id_usuario: number,
        username: string,
        password: string,
        mail: string,
        personaId: number,
        status: string
    ) {


        return new Usuario(
            id_usuario,
            username,
            password,
            mail,
            personaId,
            status
        );
    }
}