import React, { useEffect, useMemo, useRef, useState } from "react";

// Simulated zones with dynamic demand index
const baseZones = [
  { id: 'koramangala', name: 'Koramangala', center: { x: 30, y: 40 }, radius: 18 },
  { id: 'indiranagar', name: 'Indiranagar', center: { x: 65, y: 30 }, radius: 16 },
  { id: 'whitefield', name: 'Whitefield', center: { x: 80, y: 45 }, radius: 20 },
  { id: 'mgroad', name: 'MG Road', center: { x: 50, y: 50 }, radius: 14 },
];

function demandToColor(d) {
  // 0 -> green, 0.5 -> orange, 1 -> red
  if (d > 0.75) return '#e23744';
  if (d > 0.4) return '#fb923c';
  return '#22c55e';
}

function DeliveryHeatmap() {
  const [zones, setZones] = useState(baseZones.map(z => ({ ...z, demand: Math.random() })));

  useEffect(() => {
    const iv = setInterval(() => {
      setZones(prev => prev.map(z => ({
        ...z,
        demand: Math.min(1, Math.max(0, z.demand + (Math.random() - 0.5) * 0.2))
      })));
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const surgeHints = useMemo(() => zones
    .filter(z => z.demand > 0.75)
    .map(z => `${z.name}`), [zones]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-900">Delivery Heat Map</h1>
          <p className="text-sm text-slate-600">Live demand zones for delivery partners</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl professional-shadow">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="font-semibold text-slate-800">City overview</div>
            <div className="text-sm text-slate-600">Tap a zone for details</div>
          </div>
          <div className="p-6">
            <div className="relative h-[480px] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
              {zones.map(z => (
                <div key={z.id} className="absolute" style={{
                  left: `${z.center.x}%`,
                  top: `${z.center.y}%`,
                  width: `${z.radius * 2}%`,
                  height: `${z.radius * 2}%`,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${demandToColor(z.demand)}55 0%, ${demandToColor(z.demand)}22 40%, transparent 70%)`,
                  boxShadow: `0 0 0 2px ${demandToColor(z.demand)}33`
                }}>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold text-slate-800">
                    {z.name} • {(z.demand*100|0)}%
                  </div>
                </div>
              ))}
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><i className="w-3 h-3 rounded-full inline-block" style={{background:'#22c55e'}}></i>Low</span>
                  <span className="inline-flex items-center gap-1"><i className="w-3 h-3 rounded-full inline-block" style={{background:'#fb923c'}}></i>Medium</span>
                  <span className="inline-flex items-center gap-1"><i className="w-3 h-3 rounded-full inline-block" style={{background:'#e23744'}}></i>High</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl professional-shadow p-4">
            <div className="font-semibold text-slate-800 mb-2">Recommendations</div>
            {surgeHints.length ? (
              <ul className="list-disc pl-5 text-sm text-slate-700">
                {surgeHints.map(s => (
                  <li key={s}>Move towards {s}. High order probability.</li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-slate-500">No surge zones right now. Stay near popular areas.</div>
            )}
          </div>
          <div className="bg-white rounded-2xl professional-shadow p-4">
            <div className="font-semibold text-slate-800 mb-2">Earnings Boost</div>
            <div className="text-sm text-slate-700">Peak hour multiplier applies in red zones. Complete 3 deliveries for extra ₹60.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryHeatmap;


