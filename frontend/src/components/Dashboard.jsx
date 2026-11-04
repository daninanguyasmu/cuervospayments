import { useState } from "react";
import { useEffect } from "react";
import { getSummary } from "../api/getDashboardSummary";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    total_athletes: 0,
    collected: 0,
    projected: 0,
    debtors: []
  });

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSummary();
        setSummary(response)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, []);

  const progressPercentage = summary.projected > 0 ? Math.min((summary.collected / summary.projected) * 100, 100).toFixed(1) : 0;

  if (isLoading) {
     return <div className="p-6 text-slate-100 flex justify-center mt-20">Cargando...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto w-full font-sans">
      <h1 className="text-2xl font-medium text-slate-100 mb-6 tracking-wide">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-slate-800 p-5 rounded-sm border-l-4 border-blue-500 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Atletas Activos</h3>
            <span className="text-emerald-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </span>
          </div>
          <p className="text-3xl font-light text-slate-100">{summary.total_athletes}</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-sm border-l-4 border-blue-500 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Recaudado (Mes)</h3>
            <span className="text-emerald-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </span>
          </div>
          <p className="text-3xl font-light text-slate-100">${summary.collected.toLocaleString()}</p>
        </div>

        <div className="bg-slate-800 p-5 rounded-sm border-l-4 border-blue-500 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Proyectado vs Real</h3>
          </div>
          <p className="text-xl font-light text-slate-100 mt-1">
            <span className="text-emerald-400 font-medium">${summary.collected.toLocaleString()}</span>
            <span className="text-slate-500 text-sm ml-1">/ ${summary.projected.toLocaleString()}</span>
          </p>
        </div>

        <div className="bg-slate-800 p-5 rounded-sm border-l-4 border-blue-500 shadow-lg flex flex-col justify-center">
          <div className="flex justify-between mb-3">
            <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Cobranza</h3>
            <span className="text-xs font-bold text-emerald-500">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-none h-1.5 mb-1">
            <div
              className="bg-amber-500 h-1.5 rounded-none transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

      </div>

      <div className="bg-slate-800 rounded-sm shadow-lg border border-slate-700/50">
        <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
          <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Deudores Principales</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-700">
                <th className="px-6 py-4 font-medium">Atleta</th>
                <th className="px-6 py-4 font-medium">Tutor a contactar</th>
                <th className="px-6 py-4 font-medium">Teléfono</th>
                <th className="px-6 py-4 font-medium text-right">Monto Adeudado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {summary.debtors.map((debtor) => (
                <tr key={debtor.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 text-slate-200 font-light">{debtor.athlete_name}</td>
                  <td className="px-6 py-4 text-slate-400 font-light">{debtor.tutor_name}</td>
                  <td className="px-6 py-4 text-slate-400 font-light">{debtor.phone}</td>
                  <td className="px-6 py-4 font-medium text-rose-500 text-right">
                    ${debtor.debt_amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {summary.debtors.length === 0 && (
            <div className="p-6 text-center text-slate-500 font-light">
              Sin deudores pendientes en el periodo actual.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}