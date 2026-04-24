import React, { useEffect, useRef, useState } from "react";
import { FiGlobe, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import "./PartnersSection.css";



type PartnerRole = "university" | "research" | "ngo" | "farmer" | "lab" | "other";

export interface Partner {
  id: string;
  name: string;
  logoUrl?: string; // from db
  img?: string;     // from old static
  isHorizontal: boolean;
  description: string | null;
  context?: string;
  role?: PartnerRole | string | null;
  website: string | null;
}

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  text: string;
  isLoading?: boolean;
}

interface CardState {
  angle: number;
  opacity: number;
  blur: number;
  zIndex: number;
  pointerEvents: "auto" | "none";
}



const GOOGLE_MODEL_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";

async function askGeminiAPI(question: string, partner: Partner): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";
  if (!apiKey) {
    return "Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY.";
  }

  const url = `${GOOGLE_MODEL_URL}?key=${apiKey}`;

  const systemPrompt = `You are a helpful, inspiring AI ambassador for the CARES (Circular Coffee Economy Research) project in Ethiopia.
Our mission is transforming coffee waste (husks, pulp, wastewater) into value for farmers and the environment.
You are currently representing our partner: ${partner.name}.
Context about this partner: ${partner.description ?? partner.context ?? "A valued partner"}.
Answer the user's question concisely in 2-3 sentences. Keep the tone professional, optimistic, and focused on sustainability, research, and circular economy.`;

  const payload = {
    contents: [{ parts: [{ text: question }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
  };

  try {
    let response: Response | null = null;
    let retries = 0;
    const delays = [1000, 2000, 4000, 8000, 16000];

    while (retries < 5) {
      try {
        response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        break;
      } catch (err) {
        retries += 1;
        if (retries >= 5) throw err;
        await new Promise((res) => setTimeout(res, delays[retries - 1]));
      }
    }

    const data = await response!.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I'm sorry, I couldn't generate a response at this moment."
    );
  } catch {
    return "Connection error. Please try asking again later.";
  }
}

export const PartnersSection: React.FC<{ partners?: Partner[] }> = ({ partners = [] }) => {
  if (!partners || partners.length === 0) return null;
  const { t } = useLanguage();
  const getLogoSrc = (partner: Partner) => partner.logoUrl || partner.img || "";
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [cardStates, setCardStates] = useState<CardState[]>(
    () =>
      partners.map(() => ({
        angle: 0,
        opacity: 1,
        blur: 0,
        zIndex: 0,
        pointerEvents: "auto",
      })) as CardState[]
  );
  const isHoveredRef = useRef(false);
  const isModalOpenRef = useRef(false);
  const currentAngleRef = useRef(0);
  const radiusRef = useRef(550); // Default to desktop radius to avoid SSR hydration mismatch

  const animationFrameRef = useRef<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const tiltRef = useRef(-8); // initial rotateX

  // Mobile 2D carousel specific
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const isMobileSwipingRef = useRef(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePartner, setActivePartner] = useState<Partner | null>(null);

  useEffect(() => {
    // Correct mobile size after hydration
    radiusRef.current = window.innerWidth < 768 ? 320 : 550;

    // Desktop resize handles
    function onResize() {
      radiusRef.current =
        window.innerWidth < 768 ? 320 : 550;
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Mobile Auto-Scroll logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Auto scroll exclusively handles mobile view (via interval)
    interval = setInterval(() => {
      const container = mobileCarouselRef.current;
      if (!container || window.innerWidth > 768) return;
      if (isMobileSwipingRef.current) return; // Don't interrupt user swiping

      // Calculate how far we can scroll
      const maxScrollLeft = container.scrollWidth - container.clientWidth - 10;
      
      // If we are at the end, snap back to the start gracefully, else step right
      if (container.scrollLeft >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const itemWidth = container.clientWidth * 0.6; // Scroll roughly by 1 card width (60%)
        container.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function render() {
      if (!isHoveredRef.current && !isModalOpenRef.current) {
        currentAngleRef.current -= 0.1;
      }

      const totalCards = partners.length;
      const nextStates: CardState[] = partners.map((_, i) => {
        const angleStep = 360 / totalCards;
        const cardAngle = i * angleStep + currentAngleRef.current;
        const normalizedAngle = ((cardAngle % 360) + 360) % 360;
        const radians = (normalizedAngle * Math.PI) / 180;
        const cosVal = Math.cos(radians);
        const opacity = Math.max(0.15, (cosVal + 1) / 2);
        const blur = 0; // keep images sharp
        const pointerEvents = opacity < 0.5 ? "none" : "auto";
        let zIndex = Math.round(cosVal * 100);

        return { angle: cardAngle, opacity, blur, zIndex, pointerEvents };
      });

      setCardStates(nextStates);
      animationFrameRef.current = window.requestAnimationFrame(render);
    }

    animationFrameRef.current = window.requestAnimationFrame(render);
    return () => {
      if (animationFrameRef.current != null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const openModal = (partner: Partner) => {
    // Modal and AI chat disabled per new UX; no-op for now
    return;
  };

  const closeModal = () => {
    isModalOpenRef.current = false;
    setIsModalOpen(false);
    setActivePartner(null);
  };

  return (
    <section className="partners-section">
      <div className="header-container fade-up">
        <h2>{t.home.partnersTitle}</h2>
        <p className="subtitle">
          {t.home.partnersSubtitle}
        </p>
      </div>

      <div className="scene">
        <div
          className={`carousel-container${isDragging ? " is-dragging" : ""}`}
          ref={carouselRef}
          style={{ transform: `rotateX(${tiltRef.current}deg)` }}
          onWheel={(e) => {
            // Mouse wheel: rotate ring forwards/backwards
            currentAngleRef.current += e.deltaY * 0.1;
          }}
          onMouseDown={(e) => {
            setIsDragging(true);
            dragStartRef.current = { x: e.clientX, y: e.clientY };
          }}
          onMouseMove={(e) => {
            if (!isDragging || !dragStartRef.current) return;
            const dx = e.clientX - dragStartRef.current.x;
            const dy = e.clientY - dragStartRef.current.y;
            currentAngleRef.current += dx * 0.3;
            // vertical drag tilts the ring up/down
            const nextTilt = Math.max(
              -35,
              Math.min(10, tiltRef.current + dy * 0.1),
            );
            tiltRef.current = nextTilt;
          }}
          onMouseUp={() => {
            setIsDragging(false);
            dragStartRef.current = null;
          }}
          onMouseLeave={() => {
            setIsDragging(false);
            dragStartRef.current = null;
          }}
        >
          <div className="core-glow" />
          {partners.map((partner, index) => {
            const state = cardStates[index];
            const isHovered = hoveredIndex === index;
            const baseTranslateZ = radiusRef.current + (isHovered ? 40 : 0);
            const baseTransform = `rotateY(${state?.angle ?? 0}deg) translateZ(${baseTranslateZ}px)`;

            const transform = `${baseTransform} ${
              isHovered ? "scale(1.05)" : ""
            }`;

            return (
              <div
                key={partner.id}
                className="partner-card group"
                style={{
                  transform,
                  opacity: state?.opacity ?? 1,
                  filter: `blur(${state?.blur ?? 0}px)`,
                  zIndex: state?.zIndex ?? 0,
                  pointerEvents: state?.pointerEvents ?? "auto",
                }}
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                  setHoveredIndex(null);
                }}
                onClick={() => {
                  if (partner.website) {
                    window.open(partner.website, "_blank", "noopener,noreferrer");
                  } else {
                    openModal(partner);
                  }
                }}
              >
                <div
                  className="logo-wrapper"
                  style={
                    partner.isHorizontal
                      ? { borderRadius: "0.75rem" }
                      : {
                          borderRadius: "50%",
                          width: "120px",
                          height: "120px",
                          margin: "0 auto",
                        }
                  }
                >
                  <img
                    src={getLogoSrc(partner)}
                    alt={`${partner.name} Logo`}
                    className="partner-logo"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>

              </div>
            );
          })}
        </div>
      </div>
      
      {/* 2D Auto-scrolling Mobile Carousel */}
      <div 
        ref={mobileCarouselRef}
        className="partners-mobile-carousel fade-up"
        onTouchStart={() => (isMobileSwipingRef.current = true)}
        onTouchEnd={() => {
          // Add brief delay before auto-scrolling resumes
          setTimeout(() => { isMobileSwipingRef.current = false; }, 2000);
        }}
      >
        {partners.map((partner) => (
          <div key={partner.id} className="pm-card" onClick={() => {
            if (partner.website) {
              window.open(partner.website, "_blank", "noopener,noreferrer");
            } else {
              openModal(partner);
            }
          }}>
            <div className="pm-logo-wrapper" style={!partner.isHorizontal ? { borderRadius: "50%" } : {}}>
              <img src={getLogoSrc(partner)} alt={partner.name} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersSection;

