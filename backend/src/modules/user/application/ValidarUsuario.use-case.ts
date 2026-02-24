import type { UserRepository } from "../domain/Usuario/user.repository.js";
import type { PasswordHasher } from "../domain/passwordHasher.repository.js";
import { AuthDto } from "../domain/auth/auth.js";
export class ValidarUsuario {
    constructor(
        private readonly usuarioRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher
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


        if (!userData) throw new Error("Usuario no encontrado");

        if(await this.passwordHasher.comparePassword(login.password, userData.password)){
            return userData
        }else{
            
            throw new Error("Contraseña incorrecta");
        }


    }
}