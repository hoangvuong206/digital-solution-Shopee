import DashboardLayout from "@/components/DashboardLayout";
import ReviewDashboard from "@/components/ReviewDashboard";
import { reviews } from "@/data/reviews";
import { products } from "@/data/products";

export default function Home() {
  return (
    <DashboardLayout>

      {/* Dashboard Stats (PHẦN GIỐNG SHOPEE) */}
      <ReviewDashboard />

      {/* Title */}
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Danh sách đánh giá shop
      </h1>

      {/* Status Filter */}
      <div className="flex gap-3 mb-4 text-sm text-gray-700">
        <button className="px-4 py-1 border rounded-full border-orange-500 text-orange-500 font-medium">
          Tất cả (3600)
        </button>

        <button className="px-4 py-1 border rounded-full hover:bg-gray-100">
          Cần phản hồi (360)
        </button>

        <button className="px-4 py-1 border rounded-full hover:bg-gray-100">
          Đã trả lời (3240)
        </button>
      </div>

      {/* Star Filter */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-700">
        <span className="font-medium">Số sao đánh giá</span>

        <label className="flex items-center gap-1">
          <input type="checkbox" defaultChecked />
          Tất cả
        </label>

        <label className="flex items-center gap-1">
          <input type="checkbox" />
          5 Sao
        </label>

        <label className="flex items-center gap-1">
          <input type="checkbox" />
          4 Sao
        </label>

        <label className="flex items-center gap-1">
          <input type="checkbox" />
          3 Sao
        </label>

        <label className="flex items-center gap-1">
          <input type="checkbox" />
          2 Sao
        </label>

        <label className="flex items-center gap-1">
          <input type="checkbox" />
          1 Sao
        </label>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <input
          className="border px-3 py-2 rounded w-96 text-sm text-gray-800"
          placeholder="Tìm kiếm Tên sản phẩm, Mã đơn hàng..."
        />

        <input
          type="date"
          className="border px-3 py-2 rounded text-sm text-gray-800"
        />

        <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium">
          Tìm kiếm
        </button>

        <button className="border px-4 py-2 rounded text-sm text-gray-700">
          Đặt lại
        </button>
      </div>

      {/* Table */}
      <div className="border rounded">

        {/* Table Header */}
        <div className="grid grid-cols-3 bg-gray-100 text-sm font-semibold p-3 text-gray-800">
          <div>Thông tin sản phẩm</div>
          <div>Đánh giá của Người mua</div>
          <div>Thao tác</div>
        </div>

        {/* Review Rows */}
        {reviews.map((review) => {
          const product = products.find(
            (p) => p.id === review.productId
          );

          return (
            <div
              key={review.id}
              className="grid grid-cols-3 border-t p-4 text-sm items-center"
            >

              {/* Product Info */}
              <div>
                <div className="font-medium text-gray-800">
                  {product?.name}
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

                <button className="px-3 py-1 border rounded text hover:bg-gray-100">
                  Phản hồi
                </button>

                <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                  Báo cáo
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </DashboardLayout>
  );
}