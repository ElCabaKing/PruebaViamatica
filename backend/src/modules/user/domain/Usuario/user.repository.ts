import { Usuario } from "./Usuario.js";

export interface UserRepository {
    registrarNuevoUsuario(usuario: Usuario): Promise<void>;
    editarUsuario(usuario: Usuario): Promise<void>;
    eliminarUsuario(id: number): Promise<void>;
    listarUsuarios(): Promise<Usuario[]>;
    buscarUsuario(id: number): Promise<Usuario>;
}