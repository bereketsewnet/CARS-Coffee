"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ── Location data ────────────────────────────────────────────────────────────

type SiteType = "farm" | "lab" | "processing" | "belgium" | "partner";

interface ProjectSite {
  id: string;
  name: string;
  type: SiteType;
  lat: number;
  lng: number;
  description: string;
  country: string;
}

const projectSites: ProjectSite[] = [
  {
    id: "sidama-ka",
    name: "Sidama-KA PLC",
    type: "farm",
    lat: 6.83,
    lng: 38.42,
    description: "Farm / field site. Coffee cherry collection and primary processing for circular waste trials.",
    country: "Ethiopia",
  },
  {
    id: "yirgacheffe",
    name: "Yirgacheffe – Hafurisa Cooperative Society",
    type: "farm",
    lat: 6.15,
    lng: 38.2,
    description: "Primary field site. Pilot composting and circular processing trials with Hafurisa Cooperative Society.",
    country: "Ethiopia",
  },
  {
    id: "cares-biolab",
    name: "CARES BioLab, CTBE-AAU",
    type: "lab",
    lat: 9.048,
    lng: 38.766,
    description: "Room No. 205, 2nd Floor, Samsung Building, CTBE-AAU. Biochar characterisation and soil analysis.",
    country: "Ethiopia",
  },
  {
    id: "life-agro",
    name: "Life Agro PLC",
    type: "processing",
    lat: 9.02,
    lng: 38.79,
    description: "Processing station, Gurd Shola, Ethiopia. Coffee by-product valorisation and circular processing trials.",
    country: "Ethiopia",
  },
  {
    id: "antwerp",
    name: "Bioscience Engineering, University of Antwerp",
    type: "belgium",
    lat: 51.22,
    lng: 4.4,
    description: "Groenenborgerlaan 171, 2020 UAntwerpen, BELGIUM. North partner and project coordinator. Circular bioeconomy expertise and VLIR-UOS programme lead.",
    country: "Belgium",
  },
  {
    id: "ctbe-aau",
    name: "Chemical and Bioengineering, CTBE-AAU",
    type: "partner",
    lat: 9.042,
    lng: 38.76,
    description: "King George VI St. PO Box 385, CTBE-AAU, ETHIOPIA. South partner institution. Leads WP3, WP4. Environmental engineering and socio-economic research.",
    country: "Ethiopia",
  },
];

// ── Icon factory ─────────────────────────────────────────────────────────────

const COLOR_MAP: Record<SiteType, string> = {
  farm: "#4ade80",       // leaf green
  lab: "#60a5fa",        // blue
  processing: "#fb923c", // orange
  belgium: "#f59e0b",    // amber/gold
  partner: "#c084fc",    // purple
};

const LABEL_MAP: Record<SiteType, string> = {
  farm: "☕ Farm / Field Site",
  lab: "🔬 Research Lab",
  processing: "⚙️ Processing Station",
  belgium: "🏛 Belgium University",
  partner: "🏛 Partner University",
};

function makeIcon(type: SiteType) {
  const color = COLOR_MAP[type];
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26S32 27 32 16C32 7.163 24.837 0 16 0z" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `);
  return L.icon({
    iconUrl: `data:image/svg+xml,${svg}`,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -44],
  });
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ProjectMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Fix default icon URLs broken by webpack
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center">
        {(Object.keys(LABEL_MAP) as SiteType[]).map((type) => (
          <div key={type} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: COLOR_MAP[type] }}
            />
            {LABEL_MAP[type]}
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-card" style={{ height: 480 }}>
        {mounted && <MapContainer
          center={[28, 22]}
          zoom={3}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {projectSites.map((site) => (
            <Marker key={site.id} position={[site.lat, site.lng]} icon={makeIcon(site.type)}>
              <Popup maxWidth={260}>
                <div className="py-1">
                  <p className="font-semibold text-sm mb-1">{site.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{LABEL_MAP[site.type]} · {site.country}</p>
                  <p className="text-xs leading-relaxed">{site.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>}
      </div>
    </div>
  );
}
