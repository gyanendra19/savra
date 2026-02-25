import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { WeeklyTrend } from "../types";

interface Props {
  data: WeeklyTrend[];
}

const WeeklyChart: React.FC<Props> = ({ data }) => {
  const formatted = data.map((item) => ({
    label: `W${item.week}`,
    total: item.totalActivities,
  }));

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl px-6 py-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-neutral-500 tracking-wide">Analytics</p>
          <h2 className="text-lg font-medium tracking-tight">
            Weekly Activity Trend
          </h2>
        </div>

        <span className="text-xs text-neutral-400">Aggregated by week</span>
      </div>

      {/* Chart */}
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formatted}>
            <CartesianGrid
              stroke="#f1f5f9"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
              cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#111827"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyChart;
