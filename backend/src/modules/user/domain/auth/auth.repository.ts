export interface AuthRepository {
    getSessionActive(id: number): Promise<[]>;
    saveSessionActive(id: number): Promise<void>;
    closeSession(id: number): Promise<void>;
    sumarIntentos(id: number): Promise<void>;
}