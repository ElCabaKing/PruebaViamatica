export function generatePassword(longitud = 12) {
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const todos = letrasMinusculas + letrasMayusculas + numeros + simbolos;

    if (longitud < 8) {
        throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    let contrasena = '';
    contrasena += letrasMayusculas[Math.floor(Math.random() * letrasMayusculas.length)];
    contrasena += simbolos[Math.floor(Math.random() * simbolos.length)];

    for (let i = contrasena.length; i < longitud; i++) {
        contrasena += todos[Math.floor(Math.random() * todos.length)];
    }

    contrasena = contrasena.split('').sort(() => 0.5 - Math.random()).join('');

    return contrasena;
}
