import { Usuario } from "./Usuario.js";

export interface UserRepository {
    registrarNuevoUsuario(usuario: Usuario): Promise<void>;
    editarUsuario(usuario: Usuario): Promise<void>;
    eliminarUsuario(id: number): Promise<void>;
    listarUsuarios(): Promise<Usuario[]>;
    buscarUsuario(criteria: string, value: string|number): Promise<Usuario>;

    // buscador con filtros flexibles (administrador)
    buscarUsuarios(filters: Record<string, any>): Promise<Usuario[]>;

    // cambiar solo estado de usuario
    actualizarEstado(id: number, status: string): Promise<void>;

    // estadisticas para dashboard
    obtenerEstadisticas(): Promise<{
        total: number;
        activos: number;
        bloqueados: number;
        intentosFallidos: number;
    }>;

    // menú por usuario
    obtenerMenu(userId: number): Promise<string[]>;
}