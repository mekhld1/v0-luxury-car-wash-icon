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
        {/* Droplet main gradient - deep purple */}
        <linearGradient id="dropletGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="35%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>

        {/* Top glass shine highlight */}
        <linearGradient id="shineGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.95" />
          <stop offset="40%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Drop shadow filter */}
        <filter id="dropShadow" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="24" floodColor="#5B21B6" floodOpacity="0.3" />
        </filter>

        {/* Clip path for rounded square icon */}
        <clipPath id="iconClip">
          <rect x="0" y="0" width="1024" height="1024" rx="224" ry="224" />
        </clipPath>
      </defs>

      {/* Main icon container with iOS rounded corners */}
      <g clipPath="url(#iconClip)">
        {/* White background */}
        <rect width="1024" height="1024" fill="white" />

        {/* Main water droplet with shadow */}
        <g filter="url(#dropShadow)">
          {/* Perfect rounded droplet shape */}
          <path
            d="M512 140
               C512 140 720 400 720 580
               C720 695 628 800 512 800
               C396 800 304 695 304 580
               C304 400 512 140 512 140Z"
            fill="url(#dropletGradient)"
          />
        </g>

        {/* Top glossy shine highlight - clean curved shape */}
        <path
          d="M512 170
             C512 170 420 290 380 420
             C360 480 350 530 355 560
             C365 540 390 510 430 460
             C490 385 530 290 512 170Z"
          fill="url(#shineGradient)"
        />

        {/* Small accent shine dot */}
        <ellipse
          cx="420"
          cy="380"
          rx="25"
          ry="35"
          fill="white"
          opacity="0.6"
          transform="rotate(-15 420 380)"
        />
      </g>
    </svg>
  )
}

export function ShinyLogoMark({ size = 512, className = "" }: { size?: number; className?: string }) {
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
          <stop offset="35%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>

        <linearGradient id="shineGradientMark" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.95" />
          <stop offset="40%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <filter id="dropShadowMark" x="-20%" y="-10%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#5B21B6" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#dropShadowMark)">
        {/* Perfect rounded droplet shape */}
        <path
          d="M256 50
             C256 50 380 200 380 300
             C380 365 324 420 256 420
             C188 420 132 365 132 300
             C132 200 256 50 256 50Z"
          fill="url(#dropletGradientMark)"
        />
      </g>

      {/* Top glossy shine highlight */}
      <path
        d="M256 65
           C256 65 200 140 175 220
           C165 260 160 290 162 305
           C170 290 188 265 215 230
           C255 180 275 120 256 65Z"
        fill="url(#shineGradientMark)"
      />

      {/* Small accent shine dot */}
      <ellipse
        cx="200"
        cy="185"
        rx="12"
        ry="18"
        fill="white"
        opacity="0.6"
        transform="rotate(-15 200 185)"
      />
    </svg>
  )
}
