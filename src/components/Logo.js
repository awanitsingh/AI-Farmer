export default function Logo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="20" fill="url(#logoGrad)" />

      {/* Leaf shape */}
      <path
        d="M20 8 C20 8 10 14 10 22 C10 27 14.5 31 20 31 C25.5 31 30 27 30 22 C30 14 20 8 20 8Z"
        fill="white"
        fillOpacity="0.25"
      />
      <path
        d="M20 10 C20 10 12 16 12 23 C12 27.4 15.6 31 20 31 C24.4 31 28 27.4 28 23 C28 16 20 10 20 10Z"
        fill="white"
        fillOpacity="0.9"
      />

      {/* Center vein */}
      <line x1="20" y1="12" x2="20" y2="30" stroke="#16a34a" strokeWidth="1.2" strokeLinecap="round" />

      {/* Side veins */}
      <line x1="20" y1="17" x2="14" y2="21" stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="20" y1="20" x2="14" y2="24" stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="20" y1="17" x2="26" y2="21" stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="20" y1="20" x2="26" y2="24" stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />

      {/* AI circuit dots */}
      <circle cx="14" cy="21" r="1.2" fill="#16a34a" />
      <circle cx="14" cy="24" r="1.2" fill="#16a34a" />
      <circle cx="26" cy="21" r="1.2" fill="#16a34a" />
      <circle cx="26" cy="24" r="1.2" fill="#16a34a" />

      {/* Small circuit lines extending out */}
      <line x1="12.8" y1="21" x2="10" y2="21" stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="10" y1="21" x2="10" y2="24" stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="10" y1="24" x2="12.8" y2="24" stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />

      <line x1="27.2" y1="21" x2="30" y2="21" stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="30" y1="21" x2="30" y2="24" stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="30" y1="24" x2="27.2" y2="24" stroke="#16a34a" strokeWidth="0.8" strokeLinecap="round" />

      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
    </svg>
  );
}
