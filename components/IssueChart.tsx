"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { issueData } from "@/data/analysisData";

type Props = {
  productId: number;
};

export default function IssueChart({ productId }: Props) {
  const filtered = issueData
    .filter((item) => item.productId === productId)
    .sort((a, b) => b.count - a.count);

  if (filtered.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        Không có dữ liệu
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-900">
          Top vấn đề từ đánh giá khách hàng
        </h2>
        
      </div>

      {/* CHART */}
      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filtered} barSize={110}>

            {/* GRID */}
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

            {/* X */}
            <XAxis
              dataKey="issue"
              tick={{ fontSize: 15, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y */}
            <YAxis
              tick={{ fontSize: 15, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />

            {/* TOOLTIP */}
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "8px",
                fontSize: "15px",
              }}
            />

            {/* BAR */}
            <Bar
              dataKey="count"
              radius={[16, 16, 0, 0]}
              fill="#6b7280" // 🔥 MÀU XÁM
            />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}