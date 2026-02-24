'use client';

import { useEffect, useState } from 'react';

export default function Nav() {
  const [menu, setMenu] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const m = JSON.parse(sessionStorage.getItem('menu') || '[]');
      setMenu(m);
      const u = JSON.parse(sessionStorage.getItem('user') || 'null');
      setUser(u);
    }
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id_usuario }),
    });
    sessionStorage.clear();
    window.location.href = '/home';
  };

  return (
    <nav className="fixed top-0 right-0 m-4 space-y-2">
      {menu.length > 0 && (
        <ul className="space-y-1">
          {menu.map((opt) => (
            <li key={opt} className="text-sm text-blue-600">
              {opt}
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
