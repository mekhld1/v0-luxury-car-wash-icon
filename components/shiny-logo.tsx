export function ShinyLogo({ size = 1024, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Background gradient - Deep purple */}
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>

        {/* Droplet main gradient */}
        <linearGradient id="dropletGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="40%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>

        {/* Glass highlight gradient */}
        <linearGradient id="glassHighlight" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="50%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Inner glow gradient */}
        <radialGradient id="innerGlow" cx="50%" cy="40%" r="50%" fx="50%" fy="30%">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </radialGradient>

        {/* S curve gradient */}
        <linearGradient id="sCurveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" stopOpacity="0.85" />
        </linearGradient>

        {/* Sparkle gradient */}
        <radialGradient id="sparkleGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" />
          <stop offset="50%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Drop shadow filter */}
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="40" floodColor="#1E1B4B" floodOpacity="0.4" />
        </filter>

        {/* Inner shadow for depth */}
        <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
          <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
          <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
        </filter>

        {/* Glow effect for sparkles */}
        <filter id="sparkleGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft blur for glass effect */}
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="2" />
        </filter>

        {/* Clip path for rounded square icon */}
        <clipPath id="iconClip">
          <rect x="0" y="0" width="1024" height="1024" rx="224" ry="224" />
        </clipPath>
      </defs>

      {/* Main icon container with iOS rounded corners */}
      <g clipPath="url(#iconClip)">
        {/* Background */}
        <rect width="1024" height="1024" fill="url(#bgGradient)" />

        {/* Subtle background pattern - light rays */}
        <g opacity="0.1">
          <path d="M512 0 L600 512 L512 1024 L424 512 Z" fill="white" />
          <path d="M0 512 L512 424 L1024 512 L512 600 Z" fill="white" />
        </g>

        {/* Main water droplet with shadow */}
        <g filter="url(#dropShadow)">
          {/* Droplet shape */}
          <path
            d="M512 180
               C512 180 680 380 680 560
               C680 680 608 780 512 780
               C416 780 344 680 344 560
               C344 380 512 180 512 180Z"
            fill="url(#dropletGradient)"
          />
        </g>

        {/* Inner glow on droplet */}
        <path
          d="M512 200
             C512 200 660 390 660 555
             C660 665 595 760 512 760
             C429 760 364 665 364 555
             C364 390 512 200 512 200Z"
          fill="url(#innerGlow)"
        />

        {/* Glass morphism highlight - top reflection */}
        <path
          d="M512 195
             C512 195 440 280 400 380
             C380 430 370 480 370 520
             C370 520 420 520 480 460
             C540 400 560 320 512 195Z"
          fill="url(#glassHighlight)"
          opacity="0.7"
        />

        {/* Secondary highlight - subtle edge glow */}
        <ellipse
          cx="430"
          cy="420"
          rx="50"
          ry="80"
          fill="white"
          opacity="0.15"
          transform="rotate(-20 430 420)"
        />

        {/* S Curve - elegant flowing shape */}
        <g filter="url(#innerShadow)">
          <path
            d="M460 380
               C460 380 540 380 560 420
               C580 460 540 500 512 500
               C484 500 444 500 464 540
               C484 580 564 580 564 580"
            stroke="url(#sCurveGradient)"
            strokeWidth="36"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* Main sparkle - 4 point star */}
        <g filter="url(#sparkleGlow)" transform="translate(600, 320)">
          <path
            d="M0 -30 L6 -6 L30 0 L6 6 L0 30 L-6 6 L-30 0 L-6 -6 Z"
            fill="white"
          />
        </g>

        {/* Secondary sparkle - smaller */}
        <g filter="url(#sparkleGlow)" transform="translate(420, 290)">
          <path
            d="M0 -15 L3 -3 L15 0 L3 3 L0 15 L-3 3 L-15 0 L-3 -3 Z"
            fill="white"
            opacity="0.8"
          />
        </g>

        {/* Tiny accent sparkles */}
        <circle cx="560" cy="400" r="4" fill="white" opacity="0.9" filter="url(#sparkleGlow)" />
        <circle cx="640" cy="380" r="3" fill="white" opacity="0.6" />
        <circle cx="380" cy="350" r="2" fill="white" opacity="0.5" />

        {/* Bottom reflection line - glass effect */}
        <ellipse
          cx="512"
          cy="720"
          rx="100"
          ry="15"
          fill="white"
          opacity="0.1"
        />

        {/* Ambient light reflection on droplet edge */}
        <path
          d="M380 600
             C360 550 360 500 380 450"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.2"
          fill="none"
        />
      </g>
    </svg>
  )
}

export function ShinyLogoMark({ size = 512, className = "" }: { size?: number; className?: string }) {
  // Standalone droplet without background for versatile use
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="dropletGradientMark" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="40%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>

        <linearGradient id="glassHighlightMark" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="50%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="sCurveGradientMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0.85" />
        </linearGradient>

        <filter id="dropShadowMark" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#1E1B4B" floodOpacity="0.35" />
        </filter>

        <filter id="sparkleGlowMark" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#dropShadowMark)">
        <path
          d="M256 50
             C256 50 370 170 370 280
             C370 350 320 410 256 410
             C192 410 142 350 142 280
             C142 170 256 50 256 50Z"
          fill="url(#dropletGradientMark)"
        />
      </g>

      <path
        d="M256 60
           C256 60 200 130 175 200
           C165 230 158 260 158 285
           C158 285 190 285 230 245
           C270 205 285 145 256 60Z"
        fill="url(#glassHighlightMark)"
        opacity="0.6"
      />

      <path
        d="M220 180
           C220 180 280 180 295 205
           C310 230 280 255 256 255
           C232 255 205 255 220 280
           C235 305 295 305 295 305"
        stroke="url(#sCurveGradientMark)"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />

      <g filter="url(#sparkleGlowMark)" transform="translate(315, 140)">
        <path d="M0 -15 L3 -3 L15 0 L3 3 L0 15 L-3 3 L-15 0 L-3 -3 Z" fill="white" />
      </g>

      <circle cx="200" cy="130" r="4" fill="white" opacity="0.7" />
      <circle cx="330" cy="170" r="2" fill="white" opacity="0.5" />
    </svg>
  )
}
