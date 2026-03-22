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

import { reviews } from "@/data/reviews";

type Props = {
  productId: number;
};

export default function IssueChart({ productId }: Props) {
  const filteredReviews = reviews.filter(
    (r) => r.productId === productId
  );

  // 🔥 Mapping keyword → issue
  const issuesMap: Record<string, number> = {
    "Chất lượng kém": 0,
    "Size không chuẩn": 0,
    "Đóng gói kém": 0,
    "Giao hàng chậm": 0,
    "Màu sắc khác ảnh": 0,
  };

  filteredReviews.forEach((r) => {
    const c = r.comment.toLowerCase();

    if (c.includes("mỏng") || c.includes("không giống")) {
      issuesMap["Chất lượng kém"]++;
    }

    if (c.includes("size")) {
      issuesMap["Size không chuẩn"]++;
    }

    if (c.includes("đóng gói")) {
      issuesMap["Đóng gói kém"]++;
    }

    if (c.includes("giao hàng")) {
      issuesMap["Giao hàng chậm"]++;
    }

    if (c.includes("màu")) {
      issuesMap["Màu sắc khác ảnh"]++;
    }
  });

  const chartData = Object.entries(issuesMap)
    .map(([issue, count]) => ({ issue, count }))
    .filter((i) => i.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  if (chartData.length === 0) {
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
          <BarChart data={chartData} barSize={110}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />

            <XAxis
              dataKey="issue"
              tick={{ fontSize: 15, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 15, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
              contentStyle={{
                background: "#fff",
                border: "1px solid #eee",
                borderRadius: "8px",
                fontSize: "15px",
              }}
            />

            <Bar
              dataKey="count"
              radius={[16, 16, 0, 0]}
              fill="#6b7280"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}