export default function Header() {
    return (
      <div className="h-16 bg-white border-b flex items-center justify-between px-6">
        <div className="text-sm text-gray-500">
          Trang chủ / <span className="text-black">Quản lý đánh giá</span>
        </div>
  
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span className="text-sm">hvvuong206204</span>
        </div>
      </div>
    );
  }