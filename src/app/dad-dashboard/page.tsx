"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";

// Define the shape of an RSVP record
interface RsvpItem {
  id: number | string;
  child_name: string;
  is_staying: boolean;
  created_at?: string;
}

export default function DadDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [rsvps, setRsvps] = useState<RsvpItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Set password here
  const DAD_PASSWORD = "Vavipo";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === DAD_PASSWORD) {
      setIsAuthenticated(true);
      fetchRsvps();
    } else {
      alert("Incorrect password, Dad! Try again.");
    }
  };

  const fetchRsvps = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching RSVPs:", error.message);
    } else {
      setRsvps(data || []);
    }
    setLoading(false);
  };

  // Calculate stats
  const totalKids = rsvps.length;
  const parentsStaying = rsvps.filter((item) => item.is_staying).length;
  const parentsDroppingOff = totalKids - parentsStaying;

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#050b14] flex items-center justify-center p-4 font-sans select-none">
        <div className="w-full max-w-[380px] bg-[#111827] border-2 border-orange-500 rounded-2xl p-6 shadow-2xl text-center space-y-4">
          <span className="text-3xl">🔒</span>
          <h1 className="text-xl font-black text-orange-400 uppercase tracking-wider">
            Papi Dashboard
          </h1>
          <p className="text-slate-400 text-xs">
            Enter access code to view guest list.
          </p>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              placeholder="Enter Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-[#050b14] border border-slate-700 rounded-xl px-3 py-2 text-white text-xs text-center focus:outline-none focus:border-orange-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest py-2.5 rounded-xl shadow-lg hover:from-orange-600 hover:to-amber-600 transition-all"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050b14] text-white p-4 sm:p-8 font-sans select-none">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-orange-500 uppercase tracking-tight">
              Papi Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Victor's 8th Nerf Party Guest List
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* Back Button */}
            <Link
              href="/"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 transition-all"
            >
              {/* Left Arrow SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Link>

            {/* Refresh Button */}
            <button
              onClick={fetchRsvps}
              className="bg-slate-800 hover:bg-slate-700 text-orange-400 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 transition-all"
            >
              {/* Refresh SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-black text-orange-400">
              {totalKids}
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
              Total Kids
            </div>
          </div>
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {parentsStaying}
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
              Staying
            </div>
          </div>
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 text-center shadow-lg">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">
              {parentsDroppingOff}
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
              Not Staying
            </div>
          </div>
        </div>

        {/* Guest List Table */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 text-xs font-black uppercase text-orange-400 tracking-wider">
            Live Guest Submissions
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500 text-xs uppercase tracking-wider">
              Loading guest data...
            </div>
          ) : rsvps.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs uppercase tracking-wider">
              No RSVPs received yet!
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60 overflow-x-auto">
              {rsvps.map((rsvp, index) => (
                <div
                  key={rsvp.id || index}
                  className="px-4 py-3 flex items-center justify-between hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-slate-500 w-6">
                      #{index + 1}
                    </span>
                    <span className="text-sm font-black text-white uppercase">
                      {rsvp.child_name}
                    </span>
                  </div>
                  <div>
                    {rsvp.is_staying ? (
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                        Parent Staying
                      </span>
                    ) : (
                      <span className="bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                        Parent Not Staying
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
