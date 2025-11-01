"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export function TimeVisual() {
  const current = new Date().getHours();
  const day = 6;
  const night = 18;

  if (current >= night || current < day) {
    return (
      <AspectRatio
        ratio={16 / 3}
        className="bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg overflow-hidden"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 800 150"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stars */}
          <circle cx="100" cy="30" r="1.5" fill="white" opacity="0.8" />
          <circle cx="200" cy="50" r="1" fill="white" opacity="0.6" />
          <circle cx="300" cy="20" r="1.5" fill="white" opacity="0.9" />
          <circle cx="400" cy="60" r="1" fill="white" opacity="0.7" />
          <circle cx="500" cy="35" r="1.5" fill="white" opacity="0.8" />
          <circle cx="600" cy="45" r="1" fill="white" opacity="0.6" />
          <circle cx="700" cy="25" r="1.5" fill="white" opacity="0.9" />
          <circle cx="150" cy="70" r="1" fill="white" opacity="0.7" />
          <circle cx="250" cy="80" r="1.5" fill="white" opacity="0.8" />
          <circle cx="350" cy="40" r="1" fill="white" opacity="0.6" />
          <circle cx="450" cy="30" r="1.5" fill="white" opacity="0.9" />
          <circle cx="550" cy="65" r="1" fill="white" opacity="0.7" />
          <circle cx="650" cy="15" r="1.5" fill="white" opacity="0.8" />
          <circle cx="750" cy="55" r="1" fill="white" opacity="0.6" />
          <circle cx="80" cy="55" r="1.5" fill="white" opacity="0.7" />
          <circle cx="320" cy="75" r="1" fill="white" opacity="0.5" />

          {/* Moon */}
          <circle cx="700" cy="40" r="20" fill="#FFF8DC" opacity="0.9" />
          <circle cx="708" cy="38" r="18" fill="#1e1b4b" opacity="0.3" />

          {/* Mountains silhouette */}
          <path
            d="M0,150 L100,80 L200,100 L300,60 L400,90 L500,70 L600,95 L700,75 L800,100 L800,150 Z"
            fill="#0f172a"
            opacity="0.6"
          />
        </svg>
      </AspectRatio>
    );
  } else {
    return (
      <AspectRatio
        ratio={16 / 3}
        className="bg-gradient-to-b from-blue-400 to-blue-200 rounded-lg overflow-hidden"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 800 150"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sun */}
          <circle cx="700" cy="40" r="25" fill="#FDB813" />
          <g stroke="#FDB813" strokeWidth="3" strokeLinecap="round">
            <line x1="700" y1="10" x2="700" y2="0" />
            <line x1="730" y1="17" x2="737" y2="10" />
            <line x1="737" y1="40" x2="747" y2="40" />
            <line x1="730" y1="63" x2="737" y2="70" />
            <line x1="700" y1="70" x2="700" y2="80" />
            <line x1="670" y1="63" x2="663" y2="70" />
            <line x1="663" y1="40" x2="653" y2="40" />
            <line x1="670" y1="17" x2="663" y2="10" />
          </g>

          {/* Clouds */}
          <g fill="white" opacity="0.8">
            <ellipse cx="150" cy="40" rx="30" ry="15" />
            <ellipse cx="170" cy="35" rx="25" ry="12" />
            <ellipse cx="130" cy="35" rx="20" ry="10" />

            <ellipse cx="450" cy="60" rx="35" ry="18" />
            <ellipse cx="475" cy="55" rx="30" ry="15" />
            <ellipse cx="425" cy="55" rx="25" ry="12" />
          </g>

          {/* Mountains */}
          <path
            d="M0,150 L100,90 L200,110 L300,70 L400,100 L500,80 L600,105 L700,85 L800,110 L800,150 Z"
            fill="#10b981"
            opacity="0.7"
          />
          <path
            d="M0,150 L150,100 L250,120 L350,85 L450,110 L550,95 L650,115 L750,100 L800,120 L800,150 Z"
            fill="#059669"
            opacity="0.8"
          />
        </svg>
      </AspectRatio>
    );
  }
}
