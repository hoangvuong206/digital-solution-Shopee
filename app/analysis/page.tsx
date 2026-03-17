"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import IssueChart from "@/components/IssueChart";
import AIChat from "@/components/AIChat";
import ProductSelector from "@/components/ProductSelector";

export default function AnalysisPage() {

  const [selectedProductId, setSelectedProductId] = useState(1);

  return (
    <DashboardLayout>

      <h1 className="text-xl font-semibold text-gray-800 mb-6">
        Phân tích đánh giá sản phẩm
      </h1>

      {/* SELECT PRODUCT */}
      <div className="mb-4">
        <ProductSelector
          selectedId={selectedProductId}
          setSelectedId={setSelectedProductId}
        />
      </div>

      <div className="space-y-6">

        <IssueChart productId={selectedProductId} />

        <AIChat productId={selectedProductId} />

      </div>

    </DashboardLayout>
  );
}