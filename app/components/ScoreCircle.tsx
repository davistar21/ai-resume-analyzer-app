import React, { useId } from "react";

interface ScoreCircleProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  gradient?: [string, string]; // e.g. ["#34d399", "#3b82f6"]
  backgroundColor?: string;
  className?: string;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({
  value,
  max = 100,
  size = 100,
  strokeWidth = 10,
  gradient = ["#FF97AD", "#5171FF"], // default: green to blue
  backgroundColor = "#e5e7eb", // gray-200
  className = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(value, 0), max);
  const offset = circumference - (clampedValue / max) * circumference;
  const id = useId();
  const gradientId = `gradient-${id}`; // unique per instance

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradient[0]} />
            <stop offset="100%" stopColor={gradient[1]} />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Gradient Stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Score Text */}
      <div className={`absolute text-2xl font-semibold ${className}`}>
        {Math.round((clampedValue / max) * 100)}%
      </div>
    </div>
  );
};
// const ScoreCircle = ({ score = 75 }: { score: number }) => {
//   const radius = 40;
//   const stroke = 8;
//   const normalizedRadius = radius - stroke / 2;
//   const circumference = 2 * Math.PI * normalizedRadius;
//   const progress = score / 100;
//   const strokeDashoffset = circumference * (1 - progress);

//   return (
//     <div className="relative w-[100px] h-[100px]">
//       <svg
//         height="100%"
//         width="100%"
//         viewBox="0 0 100 100"
//         className="transform -rotate-90"
//       >
//         {/* Background circle */}
//         <circle
//           cx="50"
//           cy="50"
//           r={normalizedRadius}
//           stroke="#e5e7eb"
//           strokeWidth={stroke}
//           fill="transparent"
//         />
//         {/* Partial circle with gradient */}
//         <defs>
//           <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor="#FF97AD" />
//             <stop offset="100%" stopColor="#5171FF" />
//           </linearGradient>
//         </defs>
//         <circle
//           cx="50"
//           cy="50"
//           r={normalizedRadius}
//           stroke="url(#grad)"
//           strokeWidth={stroke}
//           fill="transparent"
//           strokeDasharray={circumference}
//           strokeDashoffset={strokeDashoffset}
//           strokeLinecap="round"
//         />
//       </svg>

//       {/* Score and issues */}
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="font-semibold text-sm">{`${score}/100`}</span>
//       </div>
//     </div>
//   );
// };

// export default ScoreCircle;
