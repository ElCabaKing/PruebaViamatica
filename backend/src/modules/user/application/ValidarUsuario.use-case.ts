import type { UserRepository } from "../domain/Usuario/user.repository.js";
import type { PasswordHasher } from "../domain/passwordHasher.repository.js";
import type { AuthRepository } from "../domain/auth/auth.repository.js";
import { AuthDto } from "../domain/auth/auth.js";
export class ValidarUsuario {
    constructor(
        private readonly usuarioRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly authRepository: AuthRepository
    ) { }

    async execute(login: AuthDto) {
        let criteria = ''
        switch (typeof login.criteria) {
            case 'string':
                if (login.criteria.includes('@')) criteria = 'email'
                else criteria = 'username'
                break;
            case 'number':
                criteria = 'id'
                break;
            default:
                throw new Error("Invalid criteria");
        }
        const userData = await this.usuarioRepository.buscarUsuario(criteria, login.criteria)
        console.log(await this.passwordHasher.comparePassword(login.password, userData.password))

        if (!userData) throw new Error("Usuario no encontrado");

        if (await this.passwordHasher.comparePassword(login.password, userData.password)) {
            const session = await this.authRepository.getSessionActive(userData.id_usuario)
            if (session) throw new Error("Ya hay una sesion activa");
            else {
                await this.authRepository.saveSessionActive(userData.id_usuario)
                return userData;
            }
        }
        else {
            await this.authRepository.sumarIntentos(userData.id_usuario)
            throw new Error("Contraseña incorrecta");
        }
    }
}