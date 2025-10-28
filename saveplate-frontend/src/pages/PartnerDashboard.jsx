import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function PartnerDashboard() {
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [online, setOnline] = useState(false);
  const [stats, setStats] = useState({ today: 0, earnings: 0 });

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem('saveplate_partner') || 'null');
    if (!p) return navigate('/partner/login');
    setPartner(p);
    setOnline(!!p.online);
  }, [navigate]);

  useEffect(() => {
    const iv = setInterval(() => {
      setStats(s => ({ today: s.today + (online ? 1 : 0), earnings: s.earnings + (online ? 30 : 0) }));
    }, 8000);
    return () => clearInterval(iv);
  }, [online]);

  const toggleOnline = () => {
    const updated = { ...partner, online: !online };
    setOnline(!online);
    localStorage.setItem('saveplate_partner', JSON.stringify(updated));
    setPartner(updated);
  };

  if (!partner) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Partner Dashboard</h1>
            <p className="text-sm text-slate-600">{partner.name} • {partner.phone}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${online ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-700'}`}>{online ? 'Online' : 'Offline'}</span>
            <button onClick={toggleOnline} className={`px-4 py-2 rounded-lg font-semibold ${online ? 'bg-slate-800 text-white' : 'bg-[#e23744] text-white hover:bg-[#c81f2b]'}`}>{online ? 'Go Offline' : 'Go Online'}</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl professional-shadow p-6 text-center">
          <div className="text-3xl font-bold text-slate-800">{stats.today}</div>
          <div className="text-sm text-slate-600">Deliveries Today</div>
        </div>
        <div className="bg-white rounded-2xl professional-shadow p-6 text-center">
          <div className="text-3xl font-bold text-slate-800">₹{stats.earnings}</div>
          <div className="text-sm text-slate-600">Earnings Today</div>
        </div>
        <div className="bg-white rounded-2xl professional-shadow p-6 text-center">
          <div className="text-3xl font-bold text-slate-800">4.9</div>
          <div className="text-sm text-slate-600">Rating</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="bg-white rounded-2xl professional-shadow p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-lg font-bold text-slate-800">Find high-demand areas</div>
            <div className="text-sm text-slate-600">Use the heat map to position yourself for more orders.</div>
          </div>
          <Link to="/partner/heatmap" className="px-6 py-3 bg-[#e23744] text-white rounded-lg font-semibold hover:bg-[#c81f2b]">Open Heat Map</Link>
        </div>
      </div>
    </div>
  );
}

export default PartnerDashboard;


