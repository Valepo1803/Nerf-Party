'use client';

import { useState } from 'react';

export default function Home() {
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [isStaying, setIsStaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Container Card */}
      <div className="w-full max-w-lg bg-slate-800 border-2 border-orange-500 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Badge */}
        <div className="flex justify-center mb-4">
          <span className="bg-orange-500 text-slate-900 font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
            🎯 Nerf War Birthday Party! 🎯
          </span>
        </div>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-black text-center text-amber-400 tracking-tight uppercase">
          Gear Up & Join The Fun!
        </h1>
        <p className="text-center text-slate-300 text-sm sm:text-base mt-2 mb-6">
          Please let us know if your child will be joining the battle!
        </p>

        {/* Success Message State */}
        {submitted ? (
          <div className="bg-emerald-950/80 border border-emerald-500 rounded-2xl p-6 text-center animate-fade-in">
            <span className="text-4xl">🎉</span>
            <h2 className="text-2xl font-bold text-emerald-400 mt-2">RSVP Received!</h2>
            <p className="text-slate-300 text-sm mt-1">
              Thanks <strong>{parentName}</strong>! We can't wait to see <strong>{childName}</strong> at the party.
            </p>
            <p className="text-xs text-emerald-300/80 mt-3">
              {isStaying ? "🟢 You indicated that you will be staying!" : "🔴 Drop-off only."}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-5 text-xs text-slate-400 hover:text-white underline transition-colors"
            >
              Submit another response
            </button>
          </div>
        ) : (
          /* RSVP Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Parent Name */}
            <div>
              <label className="block text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
                Parent / Guardian Name
              </label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Jane Doe"
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
              />
            </div>

            {/* Child Name */}
            <div>
              <label className="block text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
                Child's Name
              </label>
              <input
                type="text"
                required
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Alex Doe"
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
              />
            </div>

            {/* Checkbox: Parent Staying */}
            <div className="pt-2">
              <label className="flex items-center space-x-3 bg-slate-900/60 border border-slate-700/80 hover:border-orange-500/50 p-3.5 rounded-xl cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={isStaying}
                  onChange={(e) => setIsStaying(e.target.checked)}
                  className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-200">
                  Will you (the parent) be staying for the party?
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-black text-base uppercase tracking-wider py-3.5 px-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 mt-4"
            >
              Confirm RSVP 🎯
            </button>
          </form>
        )}
      </div>
    </main>
  );
}