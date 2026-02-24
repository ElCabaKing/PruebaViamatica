export function generateBaseEmail(nombres: string, apellidos: string): string {
  const nombresTrim = nombres.trim();
  const apellidosTrim = apellidos.trim();

  if (!nombresTrim) {
    throw new Error("Nombres requeridos");
  }

  const apellidosParts = apellidosTrim.split(" ").filter(Boolean);

  if (apellidosParts.length < 2) {
    throw new Error("Se requieren al menos dos apellidos");
  }

  const firstLetter = nombresTrim.charAt(0).toLowerCase();

  const [apellido1, apellido2] = apellidosParts;

  if (!apellido1 || !apellido2) {
    throw new Error("Se requieren al menos dos apellidos");
  }

  return `${firstLetter}${apellido1.toLowerCase()}${apellido2.toLowerCase()}`;
}