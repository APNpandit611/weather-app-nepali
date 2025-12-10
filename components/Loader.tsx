"use client";
import { useId } from "react";

type LoaderProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  text?: string;
};

const Loader = ({
  size = 48,
  color = "#6366f1",
  strokeWidth = 6,
  className = "",
  text = "Loading...",
}: LoaderProps) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const cuts = 8;
  const gapRatio = 0.25;
  const dashLength = circumference / (cuts * (1 + gapRatio));
  const gapLength = dashLength * gapRatio;
  const strokeDasharray = `${dashLength} ${gapLength}`;

  // Stable ID for gradient
  const gradientId = useId();

  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center gap-5 ${className}`}
    >
      <svg
        aria-hidden="true"
        className="animate-spin"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset="0"
        />
      </svg>

      <span className="text-sm text-gray-600 font-medium">{text}</span>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
