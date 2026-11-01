import { useState } from "react";
import Dashboard from "./components/Dashboard";
import AthleteForm from "./components/AthleteForm";

export default function App() {
  const [vistaActual, setVistaActual] = useState("dashboard");

  return (
    // Contenedor principal: Ocupa toda la pantalla, flex para alinear lateral y contenido
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans overflow-hidden">
      
      {/* MENÚ LATERAL (SIDEBAR) */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between">
        
        {/* Cabecera del Sidebar */}
        <div>
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <h1 className="text-lg font-bold tracking-widest text-slate-100 uppercase">
              Club Cuervos<span className="text-blue-500">.</span>
            </h1>
          </div>

          {/* Botones de Navegación */}
          <nav className="p-4 space-y-2 mt-4">
            <button 
              onClick={() => setVistaActual("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                vistaActual === "dashboard" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              Dashboard
            </button>
            
            <button 
              onClick={() => setVistaActual("registro")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors ${
                vistaActual === "registro" 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Nuevo Atleta
            </button>
          </nav>
        </div>

        {/* Perfil de Usuario (Sección inferior opcional para dar toque corporativo) */}
        <div className="p-4 border-t border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
            AD
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">Administración</p>
            <p className="text-xs text-slate-500">Club Cuervos</p>
          </div>
        </div>
      </aside>

      {/* ÁREA DE TRABAJO PRINCIPAL (SCROLLABLE) */}
      <main className="flex-1 overflow-y-auto bg-slate-900 flex justify-center items-start pt-10 pb-20">
        <div className="w-full max-w-7xl px-8">
          {vistaActual === "dashboard" ? (
            <Dashboard />
          ) : (
            <div className="flex justify-center">
               <AthleteForm />
            </div>
          )}
        </div>
      </main>

    </div>
  );
}