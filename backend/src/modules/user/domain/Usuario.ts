import { Persona } from "./Persona/Persona.js";
export class Usuario {
    public readonly id: number;
    public readonly username: string;
    public readonly password: string;
    public readonly mail: string;
    public readonly personaId: number;
    public readonly status: string;

    private constructor(
        id: number,
        username: string,
        password: string,
        mail: string,
        personaId: number,
        status: string
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.personaId = personaId;
        this.status = status
    }

    static create(
        id: number,
        username: string,
        password: string,
        mail: string,
        personaId: number,
        status: string
    ) {


        return new Usuario(
            id,
            username,
            password,
            mail,
            personaId,
            status
        );
    }
}