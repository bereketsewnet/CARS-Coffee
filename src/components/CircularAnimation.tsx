import React from "react";
import { Coffee, Sprout, FlaskConical, TrendingUp, Recycle } from "lucide-react";

// 7 items equally spaced at 360°/7 ≈ 51.43° apart on the orbit ring.
// Starting at the top (-90°) and going clockwise.
// Position formula (percentage of container, r = 50%):
//   left = 50 + 50 * cos(angle_rad)
//   top  = 50 + 50 * sin(angle_rad)
// angle_rad = (startDeg + i * stepDeg) * π / 180
// startDeg = -90 (top), stepDeg = 360/7

function orbitStyle(index: number, total: number): React.CSSProperties {
  const startDeg = -90;
  const stepDeg = 360 / total;
  const angleDeg = startDeg + index * stepDeg;
  const angleRad = (angleDeg * Math.PI) / 180;
  const r = 50; // radius as % of container
  const left = 50 + r * Math.cos(angleRad);
  const top = 50 + r * Math.sin(angleRad);
  return {
    position: "absolute",
    left: `${left}%`,
    top: `${top}%`,
    transform: "translate(-50%, -50%)",
  };
}

const TOTAL_ITEMS = 7;

export default function CircularAnimation() {
  return (
    <div className="relative flex items-center justify-center animate-fadeInUp delay-500 mt-16 lg:mt-0">
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">

        {/* Rotating Container — orbit ring + all 7 items spin together */}
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

          {/* ── Item 0: Coffee icon ── */}
          <div style={orbitStyle(0, TOTAL_ITEMS)}>
            <div className="animate-spin-reverse-slow">
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-2 md:p-3">
                <Coffee className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
              </div>
            </div>
          </div>

          {/* ── Item 1: VLIR-UOS logo ── */}
          <div style={orbitStyle(1, TOTAL_ITEMS)}>
            <div className="animate-spin-reverse-slow">
              <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-xl p-1.5 shadow-lg">
                <img
                  src="/assets/VLIRUOS.jpg"
                  alt="VLIR-UOS"
                  className="w-9 h-9 md:w-11 md:h-11 object-contain rounded-lg"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* ── Item 2: Sprout icon ── */}
          <div style={orbitStyle(2, TOTAL_ITEMS)}>
            <div className="animate-spin-reverse-slow">
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-2 md:p-3">
                <Sprout className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              </div>
            </div>
          </div>

          {/* ── Item 3: AAU logo ── */}
          <div style={orbitStyle(3, TOTAL_ITEMS)}>
            <div className="animate-spin-reverse-slow">
              <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-xl p-1.5 shadow-lg">
                <img
                  src="/assets/ADDIS ABABA UNIVERSITY.jpg"
                  alt="Addis Ababa University"
                  className="w-9 h-9 md:w-11 md:h-11 object-contain rounded-lg"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* ── Item 4: FlaskConical icon ── */}
          <div style={orbitStyle(4, TOTAL_ITEMS)}>
            <div className="animate-spin-reverse-slow">
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-2 md:p-3">
                <FlaskConical className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
              </div>
            </div>
          </div>

          {/* ── Item 5: University of Antwerp logo ── */}
          <div style={orbitStyle(5, TOTAL_ITEMS)}>
            <div className="animate-spin-reverse-slow">
              <div className="bg-white/90 backdrop-blur-xl border border-white/40 rounded-xl p-1.5 shadow-lg">
                <img
                  src="/assets/UNIVERSITY OF ANTWERP.jpg"
                  alt="University of Antwerp"
                  className="w-9 h-9 md:w-11 md:h-11 object-contain rounded-lg"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* ── Item 6: TrendingUp icon ── */}
          <div style={orbitStyle(6, TOTAL_ITEMS)}>
            <div className="animate-spin-reverse-slow">
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-2 md:p-3">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
              </div>
            </div>
          </div>

        </div>

        {/* Static Center Card */}
        <div className="absolute inset-8 md:inset-12 bg-card/60 backdrop-blur-xl border border-border rounded-full flex items-center justify-center z-10">
          <div className="text-center p-4 md:p-8">
            <Recycle className="w-10 h-10 md:w-16 md:h-16 text-amber-500 mx-auto mb-2 md:mb-4" />
            <h3 className="text-xl md:text-2xl font-light mb-1 md:mb-2 leading-tight">Circular Economy</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Waste-to-Value transformation</p>
          </div>
        </div>

      </div>
    </div>
  );
}
