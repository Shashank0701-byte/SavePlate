import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PartnerLogin() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(phone)) return alert("Enter 10-digit phone");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 600);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) return alert("Invalid OTP");
    // Mock partner session
    localStorage.setItem('saveplate_partner', JSON.stringify({ phone, name: 'Delivery Partner', online: false }));
    navigate('/partner/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 professional-shadow">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Delivery Partner Login</h1>
        <p className="text-sm text-slate-600 mb-6">Login using your mobile number</p>

        {!otpSent ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Enter 10-digit number" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-300 focus:border-rose-400" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#e23744] text-white rounded-lg px-4 py-2 font-semibold hover:bg-[#c81f2b] disabled:opacity-50">{loading ? 'Sending...' : 'Send OTP'}</button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">OTP</label>
              <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="Enter OTP" className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rose-300 focus:border-rose-400" />
            </div>
            <button type="submit" className="w-full bg-[#22c55e] text-white rounded-lg px-4 py-2 font-semibold hover:bg-emerald-600">Verify & Continue</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PartnerLogin;


