// Dashboard.jsx
import React, { useEffect } from 'react';

const StatsCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-slate-800 font-medium">{title}</h3>
    <p className="text-slate-800 text-2xl font-bold mt-2">{value}</p>
  </div>
);

const ActivityItem = ({ text }) => (
  <div className="flex items-center p-2 rounded bg-slate-100">
    <div className="w-2 h-2 rounded-full bg-blue-600 mr-3"></div>
    <span className="text-slate-800">{text}</span>
  </div>
);

const ResponsiveDashboard = ({ setTitulo }) => {
  useEffect(() => {
    setTitulo('Dashboard');
  }, [setTitulo]);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="lg:hidden h-16"></div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <StatsCard title="Vehículos Activos" value="12" />
            <StatsCard title="Citas Hoy" value="8" />
            <StatsCard title="Trabajos Pendientes" value="5" />
          </div>

          {/* Actividad reciente */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-slate-800 font-medium">Actividad Reciente</h3>
              <button className="text-blue-600 text-sm hover:text-blue-700">Ver todo</button>
            </div>
            <div className="space-y-3">
              <ActivityItem text="Servicio completado - Toyota Corolla" />
              <ActivityItem text="Nueva cita programada - Honda Civic" />
              <ActivityItem text="Diagnóstico finalizado - Ford Ranger" />
            </div>
          </div>

          {/* Prox citas (ejemplo) */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-slate-800 font-medium mb-4">Próximas Citas</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-slate-600">
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">Vehículo</th>
                    <th className="pb-3">Fecha</th>
                    <th className="pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  <tr className="border-t">
                    <td className="py-3">Juan Pérez</td>
                    <td>Toyota Corolla</td>
                    <td>Hoy 14:00</td>
                    <td><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Confirmado</span></td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3">María García</td>
                    <td>Honda Civic</td>
                    <td>Mañana 10:00</td>
                    <td><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pendiente</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveDashboard;