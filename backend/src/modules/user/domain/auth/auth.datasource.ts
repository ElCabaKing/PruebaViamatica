

export interface AuthDatasource{
    getSessionActive(id: number): Promise<[]>;
    saveSessionActive(id: number): Promise<void>;
    closeSession(id: number): Promise<void>;
}