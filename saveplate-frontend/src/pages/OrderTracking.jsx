import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function haversineDistanceKm(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

const defaultOrder = {
  id: "RES-DEMO",
  restaurant: {
    name: "Dosa Corner",
    lat: 12.9721,
    lng: 77.5933
  },
  customer: {
    name: "You",
    lat: 12.9716,
    lng: 77.5946
  },
  rider: {
    name: "Arun (KA-12-AB-3456)",
    phone: "+91 9XXXXXXXXX",
    lat: 12.9690,
    lng: 77.5800,
  },
  status: "on_the_way" // accepted -> picked_up -> on_the_way -> arriving
};

function OrderTracking() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedOrder = location.state?.order;
  const [order] = useState(passedOrder || defaultOrder);
  const [riderPos, setRiderPos] = useState({ lat: order.rider.lat, lng: order.rider.lng });
  const [phase, setPhase] = useState(order.status);
  const [etaMins, setEtaMins] = useState(12);
  const rafRef = useRef();

  const pathPoints = useMemo(() => {
    // Simple straight-line interpolation from rider -> restaurant -> customer
    const waypoints = [
      { lat: order.rider.lat, lng: order.rider.lng },
      { lat: order.restaurant.lat, lng: order.restaurant.lng },
      { lat: order.customer.lat, lng: order.customer.lng }
    ];
    return waypoints;
  }, [order]);

  useEffect(() => {
    // Simulate rider movement along path over ~90 seconds
    const totalDurationMs = 90000;
    const start = performance.now();
    const [p0, p1, p2] = pathPoints;

    function lerp(a, b, t) { return a + (b - a) * t; }
    function interpPoint(a, b, t) { return { lat: lerp(a.lat, b.lat, t), lng: lerp(a.lng, b.lng, t) }; }

    function step(ts) {
      const elapsed = ts - start;
      const progress = Math.min(1, elapsed / totalDurationMs);
      // split: 45% to restaurant, 55% to customer
      const toRestaurant = Math.min(1, progress / 0.45);
      const toCustomer = progress <= 0.45 ? 0 : (progress - 0.45) / 0.55;

      if (progress < 0.45) {
        setPhase(toRestaurant < 1 ? "picked_up" : "on_the_way");
        setRiderPos(interpPoint(p0, p1, toRestaurant));
      } else {
        setPhase(toCustomer < 1 ? "on_the_way" : "arriving");
        setRiderPos(interpPoint(p1, p2, toCustomer));
      }

      // naive ETA: distance rider->destination at avg 18km/h
      const dest = progress < 0.45 ? p1 : p2;
      const km = haversineDistanceKm(riderPos, dest);
      const mins = Math.max(1, Math.round((km / 18) * 60));
      setEtaMins(mins);

      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pathPoints, riderPos]);

  const statusSteps = [
    { key: "accepted", label: "Order Accepted" },
    { key: "picked_up", label: "Picked up from restaurant" },
    { key: "on_the_way", label: "On the way" },
    { key: "arriving", label: "Arriving soon" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-slate-100">←</button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Live Order Tracking</h1>
            <p className="text-sm text-slate-600">Order {order.id} • ETA {etaMins} min</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map mock */}
        <div className="lg:col-span-2 bg-white rounded-2xl professional-shadow overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="font-semibold text-slate-800">Route overview</div>
            <div className="text-sm text-slate-600">ETA ~ {etaMins} min</div>
          </div>
          <div className="p-6">
            <div className="relative h-80 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
              {/* restaurant pin */}
              <div className="absolute left-[20%] top-[45%] -translate-x-1/2 -translate-y-1/2">
                <div className="w-8 h-8 rounded-full bg-[#e23744] text-white grid place-items-center shadow-lg">🏪</div>
                <div className="text-xs mt-1 font-semibold text-slate-700">Restaurant</div>
              </div>
              {/* customer pin */}
              <div className="absolute right-[18%] bottom-[25%] translate-x-1/2 translate-y-1/2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white grid place-items-center shadow-lg">🏠</div>
                <div className="text-xs mt-1 font-semibold text-slate-700">You</div>
              </div>
              {/* rider pin - animates via inline style */}
              <div
                className="absolute transition-transform duration-200"
                style={{
                  left: `${20 + (riderPos.lng - pathPoints[0].lng) / (pathPoints[2].lng - pathPoints[0].lng) * 60}%`,
                  top: `${45 + (riderPos.lat - pathPoints[0].lat) / (pathPoints[2].lat - pathPoints[0].lat) * 30}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-9 h-9 rounded-full bg-black text-white grid place-items-center shadow-xl">🛵</div>
                <div className="text-xs mt-1 font-semibold text-slate-700 text-center">Rider</div>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl professional-shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-slate-800">Rider</div>
              <a href={`tel:${order.rider.phone}`} className="text-sm text-[#e23744] font-semibold">Call</a>
            </div>
            <div className="text-sm text-slate-700">{order.rider.name}</div>
            <div className="text-xs text-slate-500">Usually delivers within 15–25 mins</div>
          </div>

          <div className="bg-white rounded-2xl professional-shadow p-4">
            <div className="font-semibold text-slate-800 mb-2">Status</div>
            <ol className="space-y-2">
              {statusSteps.map((s, i) => {
                const active = s.key === phase || (phase === 'on_the_way' && (s.key === 'picked_up' || s.key === 'accepted')) || (phase === 'arriving' && s.key !== 'accepted');
                return (
                  <li key={s.key} className={`flex items-center gap-2 ${active ? 'text-slate-900' : 'text-slate-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${active ? 'bg-[#e23744]' : 'bg-slate-300'}`}></span>
                    <span className="text-sm">{s.label}</span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="bg-white rounded-2xl professional-shadow p-4">
            <div className="font-semibold text-slate-800 mb-1">Order</div>
            <div className="text-sm text-slate-700">Order {order.id}</div>
            <div className="text-xs text-slate-500">Paid • Contactless pickup available</div>
            <div className="mt-3">
              <Link to="/customer" className="text-sm font-semibold text-[#e23744]">Browse more meals</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTracking;


