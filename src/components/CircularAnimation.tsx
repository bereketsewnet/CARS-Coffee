import { Coffee, Sprout, FlaskConical, TrendingUp, Recycle } from "lucide-react";

export default function CircularAnimation() {
  return (
    <div className="relative flex items-center justify-center animate-fadeInUp delay-500 mt-16 lg:mt-0">
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
        {/* Rotating Container for both circle and icons */}
        <div className="absolute inset-0 animate-spin-slow">
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

          {/* Orbiting Icons */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
            <div className="animate-spin-reverse-slow">
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-2 md:p-3">
                <Coffee className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
            <div className="animate-spin-reverse-slow">
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-2 md:p-3">
                <Sprout className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2">
            <div className="animate-spin-reverse-slow">
              <div className="bg-card/60 backdrop-blur-xl border border-border rounded-xl p-2 md:p-3">
                <FlaskConical className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2">
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
