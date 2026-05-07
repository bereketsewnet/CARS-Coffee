import React from "react";
import { Coffee, Sprout, FlaskConical, TrendingUp, Globe } from "lucide-react";

function orbitStyle(index: number, total: number): React.CSSProperties {
  const startDeg = -90;
  const stepDeg = 360 / total;
  const angleDeg = startDeg + index * stepDeg;
  const angleRad = (angleDeg * Math.PI) / 180;
  const r = 50;
  const left = 50 + r * Math.cos(angleRad);
  const top = 50 + r * Math.sin(angleRad);
  return {
    position: "absolute",
    left: `${left}%`,
    top: `${top}%`,
    transform: "translate(-50%, -50%)",
  };
}

const ICONS = [
  { icon: Coffee,       color: "text-amber-500" },
  { icon: Sprout,       color: "text-green-500" },
  { icon: Globe,        color: "text-blue-400"  },
  { icon: FlaskConical, color: "text-amber-400" },
  { icon: TrendingUp,   color: "text-green-400" },
];

export default function CircularAnimation() {
  return (
    <div className="relative flex items-center justify-center animate-fadeInUp delay-500 mt-16 lg:mt-0">
      <style>{`
        @keyframes ropeColorCycle {
          0%   { stroke: #92400e; }
          30%  { stroke: #78350f; }
          60%  { stroke: #b45309; }
          100% { stroke: #92400e; }
        }
        @keyframes ropeColorCycle2 {
          0%   { stroke: #7c2d12; }
          30%  { stroke: #a16207; }
          60%  { stroke: #6b3a2a; }
          100% { stroke: #7c2d12; }
        }
      `}</style>

      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">

        {/* Rotating container */}
        <div className="absolute inset-0 animate-spin-slow">

          {/* Rope ring — two overlapping dashed rings offset to mimic twisted rope */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* outer strand */}
            <circle
              cx="50" cy="50" r="49"
              fill="none"
              strokeWidth="2.2"
              strokeDasharray="5 3.5"
              strokeDashoffset="0"
              strokeLinecap="round"
              style={{ animation: "ropeColorCycle 8s ease-in-out infinite" }}
            />
            {/* inner strand — offset to create rope twist */}
            <circle
              cx="50" cy="50" r="49"
              fill="none"
              strokeWidth="2.2"
              strokeDasharray="5 3.5"
              strokeDashoffset="4.25"
              strokeLinecap="round"
              style={{ animation: "ropeColorCycle2 8s ease-in-out infinite" }}
            />
          </svg>

          {/* Icons on the rope */}
          {ICONS.map((item, i) => (
            <div key={i} style={orbitStyle(i, ICONS.length)}>
              <div className="animate-spin-reverse-slow">
                <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-2 md:p-3">
                  <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Static Center — CARES logo */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            src="/assets/IMAGE_FOR_LOGO.jpg"
            alt="CARES Logo"
            className="w-52 h-52 md:w-64 md:h-64 rounded-full object-cover shadow-glow"
            draggable={false}
          />
        </div>

      </div>
    </div>
  );
}
