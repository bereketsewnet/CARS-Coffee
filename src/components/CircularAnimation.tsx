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
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">

        {/* Rotating Container */}
        <div className="absolute inset-0 animate-spin-slow">
          {/* Dashed orbit ring */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="49"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="12 8"
              className="text-amber-500/30"
            />
          </svg>

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
