import React, { useState } from "react";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Mfit App</h1>
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white"
          onClick={() => setDark(!dark)}
        >
          Alternar Tema
        </button>
        <p className="mt-4">Substitua este App.js pelo código do Mfit React – Mobile Trainer.</p>
      </div>
    </div>
  );
}
