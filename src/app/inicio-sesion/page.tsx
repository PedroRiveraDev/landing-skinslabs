"use client";

import Header from "@/components/ui/Header";
import { useState } from "react";

export default function InicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí va tu lógica de autenticación
    console.log({ email, password });
  };

  return (
    <>
      <Header />

      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-slate-950">
          <div className="absolute inset-0 bg-slate-950/70"></div>
          <div className="absolute inset-0">
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,191,255,0.25),transparent)] rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(255,0,200,0.30),transparent)] rounded-full blur-2xl" />
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(0,191,255,0.15),transparent)] rounded-full blur-2xl" />
          </div>
          <div className="absolute inset-0 grid-pattern bg-grid-sm md:bg-grid-lg opacity-5" />
        </div>

        <div className="relative z-10 max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Inicia Sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 outline-none text-black"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 outline-none text-black"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-sky-700 transition duration-200 shadow-lg"
            >
              Ingresar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
