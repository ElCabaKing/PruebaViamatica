export function generateUsername(nombres: string) {
  const base = nombres.split(" ")[0];
  const random = Math.floor(100 + Math.random() * 900);
  return `${base}${random}`;
}