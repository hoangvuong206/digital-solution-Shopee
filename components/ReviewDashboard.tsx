import Link from "next/link";

export default function ReviewDashboard() {
    return (
      <div className="space-y-6 mb-8">
  
        {/* Shop Rating */}
        <div className="text-lg font-semibold text-gray-800">
          Đánh Giá Shop <span className="text-orange-500">4.6</span>/5
        </div>
  
  
        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-4">
  
          <div className="bg-white border rounded p-5 space-y-2">
            <div className="text-sm text-gray-500">Tổng lượt đánh giá</div>
            <span className="text-2xl font-semibold text-orange-500">
              3600
            </span>
          </div>
  
          <div className="bg-white border rounded p-5 space-y-2">
            <div className="text-sm text-gray-500">
              Tỷ lệ đánh giá đơn hàng
            </div>
            <span className="text-2xl font-semibold text-orange-500">
              72%
            </span>
          </div>
  
          <div className="bg-white border rounded p-5 space-y-2">
            <div className="text-sm text-gray-500">
              Tỷ lệ đánh giá tốt
            </div>
            <span className="text-2xl font-semibold text-orange-500">
              86%
            </span>
          </div>
  
        </div>
  
  
        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-4">
  
          {/* Negative Reviews */}
          <div className="bg-white border rounded p-5 space-y-2">
  
            <div className="text-sm text-gray-500">
              Đánh giá tiêu cực cần phản hồi
            </div>
  
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-orange-500">
                36
              </span>
              <button className="text-sm text-blue-500 hover:underline">
                Xem
              </button>
            </div>
  
            <div className="text-xs text-gray-400">
              Các đánh giá 1 & 2 sao cần bạn phản hồi
            </div>
  
          </div>
  
  
          {/* Recent Reviews */}
          <div className="bg-white border rounded p-5 space-y-2">
  
            <div className="text-sm text-gray-500">
              Đánh giá gần đây
            </div>
  
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-orange-500">
                360
              </span>
              <button className="text-sm text-blue-500 hover:underline">
                Xem
              </button>
            </div>
  
            <div className="text-xs text-gray-400">
              Đánh giá mới được cập nhật từ lần truy cập trước
            </div>
  
          </div>
  
  
          {/* AI Analysis Tool */}
          <div className="bg-white border rounded p-5 space-y-3">
  
            <div className="text-sm text-gray-600 font-medium">
              Phân tích chuyên sâu 
            </div>
  
            <div className="border-t"></div>
  
            <Link
                href="/analysis"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded"
            >
                Truy cập ngay
            </Link>
  
          </div>
  
        </div>
  
      </div>
    );
  }