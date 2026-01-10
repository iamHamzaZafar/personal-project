"use client";

interface SimpleLineChartProps {
  data: { label: string; value1: number; value2?: number }[];
  color1?: string;
  color2?: string;
  height?: number;
}

export function SimpleLineChart({
  data,
  color1 = "#8b5cf6",
  color2 = "#a78bfa",
  height = 200,
}: SimpleLineChartProps) {
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.value1, d.value2 || 0))
  );
  const minValue = Math.min(
    ...data.map((d) => Math.min(d.value1, d.value2 || 0))
  );
  const range = maxValue - minValue || 1;

  const width = 600;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const getX = (index: number) => padding + (index / (data.length - 1 || 1)) * chartWidth;
  const getY = (value: number) =>
    padding + chartHeight - ((value - minValue) / range) * chartHeight;

  const path1 = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.value1)}`)
    .join(" ");

  const path2 = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(d.value2 || 0)}`)
    .join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="min-w-full">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color1} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color1} stopOpacity="0" />
          </linearGradient>
          {color2 && (
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color2} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color2} stopOpacity="0" />
            </linearGradient>
          )}
        </defs>
        <path
          d={`${path1} L ${getX(data.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`}
          fill="url(#gradient1)"
        />
        <path
          d={path1}
          fill="none"
          stroke={color1}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {color2 && (
          <>
            <path
              d={`${path2} L ${getX(data.length - 1)} ${height - padding} L ${padding} ${height - padding} Z`}
              fill="url(#gradient2)"
            />
            <path
              d={path2}
              fill="none"
              stroke={color2}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
        {data.map((d, i) => (
          <g key={i}>
            <circle
              cx={getX(i)}
              cy={getY(d.value1)}
              r="4"
              fill={color1}
              className="hover:r-6 transition-all"
            />
            {d.value2 !== undefined && (
              <circle
                cx={getX(i)}
                cy={getY(d.value2)}
                r="4"
                fill={color2}
                className="hover:r-6 transition-all"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

interface SimpleBarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
}

export function SimpleBarChart({
  data,
  color = "#8b5cf6",
  height = 200,
}: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const width = 600;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / data.length - 4;

  const getX = (index: number) => padding + index * (chartWidth / data.length) + 2;
  const getY = (value: number) => padding + chartHeight - (value / maxValue) * chartHeight;
  const getHeight = (value: number) => (value / maxValue) * chartHeight;

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="min-w-full">
        {data.map((d, i) => (
          <g key={i}>
            <rect
              x={getX(i)}
              y={getY(d.value)}
              width={barWidth}
              height={getHeight(d.value)}
              fill={color}
              rx="4"
              className="hover:opacity-80 transition-opacity"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

interface StackedBarChartProps {
  data: { label: string; values: number[] }[];
  colors: string[];
  height?: number;
}

export function StackedBarChart({
  data,
  colors,
  height = 200,
}: StackedBarChartProps) {
  const maxValue = Math.max(
    ...data.map((d) => d.values.reduce((a, b) => a + b, 0))
  );
  const width = 600;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / data.length - 4;

  const getX = (index: number) => padding + index * (chartWidth / data.length) + 2;

  return (
    <div className="w-full overflow-x-auto">
      <svg width={width} height={height} className="min-w-full">
        {data.map((d, i) => {
          let currentY = padding + chartHeight;
          return d.values.map((value, j) => {
            const barHeight = (value / maxValue) * chartHeight;
            const y = currentY - barHeight;
            currentY = y;
            return (
              <rect
                key={`${i}-${j}`}
                x={getX(i)}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={colors[j % colors.length]}
                rx="4"
                className="hover:opacity-80 transition-opacity"
              />
            );
          });
        })}
      </svg>
    </div>
  );
}
