export class Persona {
  public readonly id: number;
  public readonly nombre: string;
  public readonly apellidos: string;
  public readonly identificacion: string;
  public readonly fechaNacimiento: Date;

  private constructor(
    id: number,
    nombre: string,
    apellidos: string,
    identificacion: string,
    fechaNacimiento: Date
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.identificacion = identificacion;
    this.fechaNacimiento = fechaNacimiento;
  }

  static create(
    id: number,
    nombre: string,
    apellidos: string,
    identificacion: string,
    fechaNacimiento: Date
  ) {
    if (!nombre || nombre.trim().length < 2) {
      throw new Error("Nombre inválido");
    }

    if (!apellidos || apellidos.trim().length < 2) {
      throw new Error("Apellidos inválidos");
    }

    if (!/^\d{10}$/.test(identificacion)) {
      throw new Error("Identificación inválida");
    }

    const hoy = new Date();
    if (fechaNacimiento >= hoy) {
      throw new Error("Fecha de nacimiento inválida");
    }

    return new Persona(
      id,
      nombre.trim(),
      apellidos.trim(),
      identificacion,
      fechaNacimiento
    );
  }
}