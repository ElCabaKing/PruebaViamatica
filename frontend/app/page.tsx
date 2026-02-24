import Image from "next/image";

import Link from "next/link";

export default function RootPage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Página de inicio</h1>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link href="/home">Login</Link>
          </li>
          <li>
            <Link href="/persona">Registrar persona</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
