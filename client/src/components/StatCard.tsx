import React from "react";

interface Props {
  title: string;
  value: number;
  subtitle?: string;
}

const StatCard: React.FC<Props> = ({ title, value, subtitle }) => {
  return (
    <div
      className="
        bg-linear-to-br from-slate-50 to-slate-100
        border border-slate-200
        rounded-xl
        px-6 py-5
        transition-all duration-300
        hover:shadow-lg hover:border-blue-300
        hover:from-blue-50 hover:to-indigo-50
        backdrop-blur-sm
      "
    >
      {/* Label */}
      <p className="text-xs font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 tracking-widest uppercase">
        {title}
      </p>

      {/* Value */}
      <div className="flex items-end justify-between mt-3">
        <span className="text-3xl font-bold tracking-tight bg-linear-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
          {value}
        </span>

        {subtitle && (
          <span className="text-xs font-medium text-indigo-500 px-2 py-1 bg-indigo-50 rounded-lg">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
