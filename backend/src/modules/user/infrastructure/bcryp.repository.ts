import type { PasswordHasher } from "../domain/passwordHasher.repository.js"
import bcrypt from "bcrypt"
export class BcryptPasswordHasher implements PasswordHasher{
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}