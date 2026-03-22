"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ReviewDashboard from "@/components/ReviewDashboard";
import { reviews } from "@/data/reviews";
import { products } from "@/data/products";

export default function Home() {
  const REVIEWS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const currentReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  // 🔥 GENERATE PAGINATION (Shopee style)
  const getPagination = () => {
    const pages = [];

    // luôn có trang 1
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // pages xung quanh current
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // luôn có trang cuối
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return [...new Set(pages)];
  };

  const pages = getPagination();

  return (
    <DashboardLayout>
      <ReviewDashboard />

      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Danh sách đánh giá shop
      </h1>

      {/* TABLE */}
      <div className="border rounded bg-white">
        <div className="grid grid-cols-3 bg-gray-100 text-sm font-semibold p-3 text-gray-800">
          <div>Thông tin sản phẩm</div>
          <div>Đánh giá của Người mua</div>
          <div>Thao tác</div>
        </div>

        {currentReviews.map((review) => {
          const product = products.find(
            (p) => p.id === review.productId
          );

          return (
            <div
              key={review.id}
              className="grid grid-cols-3 border-t p-4 text-sm items-center hover:bg-gray-50"
            >
              {/* Product (no image) */}
              <div>
                <div className="font-medium text-gray-800">
                  {product?.name}
                </div>
                <div className="text-xs text-gray-500">
                  ID: {product?.id}
                </div>
              </div>

              {/* Review */}
              <div>
                <div className="text-yellow-500">
                  {"⭐".repeat(review.rating)}
                </div>
                <div className="text-gray-700 mt-1">
                  {review.comment}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {review.user}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-400 rounded text-sm text-gray-800 hover:bg-gray-100">
                  Phản hồi
                </button>

                <button className="px-3 py-1 border border-red-400 text-red-600 rounded text-sm hover:bg-red-50">
                  Báo cáo
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔥 PAGINATION */}
      <div className="flex justify-center mt-6 gap-2">
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => setCurrentPage(Number(page))}
              className={`px-3 py-1 border rounded text-sm ${
                currentPage === page
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </DashboardLayout>
  );
}