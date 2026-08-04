interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="6" fill="#141820" />
      <rect x="6" y="30" width="5" height="5" rx="1" fill="#2aabba" />
      <rect x="13" y="30" width="5" height="5" rx="1" fill="#b8107a" />
      <rect x="20" y="30" width="5" height="5" rx="1" fill="#d4a017" />
      <rect x="27" y="30" width="5" height="5" rx="1" fill="#ffffff" opacity="0.85" />
      <text
        x="20"
        y="22"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="Georgia, serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        AE
      </text>
    </svg>
  );
}
