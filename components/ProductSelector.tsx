"use client";

import { products } from "@/data/products";

type Props = {
  selectedId: number;
  setSelectedId: (id: number) => void;
};

export default function ProductSelector({ selectedId, setSelectedId }: Props) {
  return (
    <div className="flex items-center gap-3">

      <span className="text-sm font-medium text-gray-700">
        Chọn sản phẩm:
      </span>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(Number(e.target.value))}
        className="border px-3 py-2 rounded text-sm text-gray-800"
      >
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

    </div>
  );
}