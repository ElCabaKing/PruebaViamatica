

export interface AuthDatasource{
    getSessionActive(id: number): Promise<[]>;
    getLastSession(id: number): Promise<any>;
    saveSessionActive(id: number): Promise<void>;
    closeSession(id: number): Promise<void>;
    sumarIntentos(id: number): Promise<void>;
}