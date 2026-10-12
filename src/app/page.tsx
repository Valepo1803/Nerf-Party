"use client";

import { useState } from "react";
import { supabase } from "./lib/supabase";
import Link from "next/link";

export default function Home() {
  const [childName, setChildName] = useState("");
  const [isStaying, setIsStaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rsvpId, setRsvpId] = useState<number | string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (rsvpId) {
      const { error } = await supabase
        .from("rsvps")
        .update({
          child_name: childName,
          is_staying: isStaying,
        })
        .eq("id", rsvpId);

      setLoading(false);

      if (error) {
        console.error("Error updating:", error.message);
        alert(`Database error: ${error.message}`);
      } else {
        setSubmitted(true);
        try {
          await fetch("/api/notify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              child_name: childName,
              is_staying: isStaying,
            }),
          });
        } catch (err) {
          console.error("Failed to send notification:", err);
        }
      }
    } else {
      // ➕ INSERT new row on first submission and grab its ID
      const { data, error } = await supabase
        .from("rsvps")
        .insert([
          {
            child_name: childName,
            is_staying: isStaying,
          },
        ])
        .select();

      setLoading(false);

      if (error) {
        console.error("Error inserting:", error.message);
        alert(`Database error: ${error.message}`);
      } else {
        if (data && data.length > 0) {
          setRsvpId(data[0].id); // Lock in the ID for future edits
        }
        setSubmitted(true);

        try {
          await fetch("/api/notify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              child_name: childName,
              is_staying: isStaying,
            }),
          });
        } catch (err) {
          console.error("Failed to send notification:", err);
        }
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#050b14] flex items-center justify-center p-4 font-sans select-none">
      {/* Phone Mockup Frame */}
      <div>
        {/* Scrollable Card Container */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* Main 3D Printed VIP Pass Card */}
          <div className="bg-[#1d4ed8] border-4 border-black rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            {/* Lanyard Slot */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full border border-blue-900"></div>

            {/* Left Side Grip Lines */}
            <div className="absolute left-0 top-12 bottom-12 w-2.5 flex flex-col justify-between py-1">
              <div className="w-full h-3 bg-black rounded-r"></div>
              <div className="w-full h-3 bg-black rounded-r"></div>
              <div className="w-full h-3 bg-black rounded-r"></div>
              <div className="w-full h-3 bg-black rounded-r"></div>
              <div className="w-full h-3 bg-black rounded-r"></div>
            </div>

            {/* Right Side Grip Lines */}
            <div className="absolute right-0 top-12 bottom-12 w-2.5 flex flex-col justify-between py-1">
              <div className="w-full h-3 bg-black rounded-l"></div>
              <div className="w-full h-3 bg-black rounded-l"></div>
              <div className="w-full h-3 bg-black rounded-l"></div>
              <div className="w-full h-3 bg-black rounded-l"></div>
              <div className="w-full h-3 bg-black rounded-l"></div>
            </div>

            {/* Card Content Wrapper */}
            <div className="px-2">
              {/* Header Badge */}
              <div className="text-[11px] font-black tracking-widest text-orange-500 uppercase mb-1">
                VIP PASS: NERF PARTY ZONE
              </div>

              {/* Title & Target Layout Grid */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-orange-500 uppercase tracking-tight leading-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
                    VICTOR
                    <br />
                    IS TURNING 8!
                  </h1>
                </div>

                {/* Target Graphic */}
                <div className="w-16 h-16 bg-white rounded-full border-4 border-black flex items-center justify-center shadow-md relative flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-500 rounded-full border-2 border-black flex items-center justify-center">
                    <div className="w-7 h-7 bg-white rounded-full border-2 border-black flex items-center justify-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission Details */}
              <div className="mt-3 space-y-0.5 text-xs font-black tracking-wide uppercase text-white">
                <p>MISSION: BOUNCE & ADVENTURE</p>
                <p className="text-orange-400">DATE: SUNDAY, NOV 15</p>
                <p className="text-orange-400">TIME: 2:00 PM - 4:30 PM</p>
              </div>

              {/* Location & Info */}
              <div className="mt-3 pt-2 border-t border-blue-600 text-[10px] sm:text-[11px] font-bold space-y-0.5 text-blue-100 uppercase">
                <p className ="text-orange-400">Click underlined Links for directions ↓</p>
                <p className="text-white font-black ">
                  LOCATION:{" "}
                  <a
                    className="underline"
                    href="https://maps.app.goo.gl/zug3jJ8d99XUr14h7"
                  >
                    EXTREME BOUNCE INFLATAPARK
                  </a>{" "}
                  (TABLE 4)
                </p>
                <p>
                  ADDRESS:{" "}
                  <a
                    className="underline"
                    href="https://maps.app.goo.gl/zug3jJ8d99XUr14h7"
                  >
                    10153 KING GEORGE BLVD.
                  </a>{" "}
                  UNIT 3700
                </p>
                <p className="text-white font-black">
                  ANY QUESTIONS?
                  <br />
                  CALL DIEGO: 604-880-8350
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Form Box (Styled like a matching tactical module) */}
          <div className="bg-[#111827] border-2 border-orange-500/80 rounded-2xl p-4 shadow-xl relative">
            {submitted ? (
              <div className="flex flex-col items-center text-center">
                {/* Custom CSS Nerf Target */}
                <div className="w-12 h-12 bg-white rounded-full border-2 border-black flex items-center justify-center shadow-md relative my-1">
                  <div className="w-9 h-9 bg-orange-500 rounded-full border border-black flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-full border border-black flex items-center justify-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h2 className="text-lg font-bold text-emerald-400 mt-1 uppercase tracking-wider">
                  RSVP Confirmed!
                </h2>
                <p className="text-slate-300 text-xs mt-1">
                  Thanks! We're excited to see <strong>{childName}</strong> at
                  the party.
                </p>
                <p className="text-[11px] text-emerald-300 mt-2 font-semibold">
                  {isStaying ? "🟢 Parent staying" : "🔴 Parent not staying"}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-[11px] text-blue-400 hover:underline uppercase tracking-wider font-bold"
                >
                  Edit Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="text-[11px] font-black uppercase text-orange-400 tracking-wider text-center border-b border-slate-800 pb-2">
                  RSVP for Victor's Nerf Party!
                </div>

                {/* Child Name */}
                <div>
                  <label className="block text-[10px] font-extrabold text-orange-400 uppercase tracking-wider mb-1">
                    Child's Name
                  </label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="e.g. Victor"
                    className="w-full bg-[#050b14] border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 text-xs"
                  />
                </div>

                {/* Checkbox */}
                <div>
                  <label className="flex items-center space-x-2.5 bg-[#050b14] border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isStaying}
                      onChange={(e) => setIsStaying(e.target.checked)}
                      className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
                    />
                    <span className="text-[11px] font-bold text-slate-200 uppercase">
                      Will you (parent) be staying?
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest py-3 px-4 rounded-xl shadow-lg transition-all transform active:scale-95 border border-orange-400 mt-1 flex items-center justify-center space-x-2"
                >
                  {loading ? "Saving..." : "Confirm RSVP "}
                </button>
              </form>
            )}
          </div>
        </div>
        {/* Dad Dashboard Access Button */}
        <div className="mt-4 text-center">
          <Link
            href="/dad-dashboard"
            className="inline-flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-orange-400 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/50 px-3 py-2 rounded-xl transition-all"
          >
            <span>🔒 Papi Dashboard</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
