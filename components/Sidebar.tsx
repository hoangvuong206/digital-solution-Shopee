export default function Sidebar() {
    return (
      <div className="w-64 h-screen bg-white border-r">
  
        {/* Logo */}
        <div className="h-16 bg-orange-600 text-white flex items-center justify-center font-semibold text-lg tracking-wide">
            Shopee Seller
        </div>
  
        <nav className="px-4 text-sm">
  
          {/* MARKETING */}
          <div className="mt-6 mb-3 font-semibold text-gray-800">
            Marketing
          </div>
  
          <div className="pl-4 border-l-2 border-gray-200 space-y-2 text-gray-700">
  
            <div className="cursor-pointer hover:text-orange-500">
              Kênh Marketing
            </div>
  
            <div className="cursor-pointer hover:text-orange-500">
              Live & Video
            </div>
  
            <div className="cursor-pointer hover:text-orange-500">
              Khuyến mãi của shop
            </div>
  
            <div className="cursor-pointer hover:text-orange-500">
              Flash Sale
            </div>
  
          </div>
  
  
          {/* CUSTOMER SERVICE */}
          <div className="mt-6 mb-3 font-semibold text-gray-800">
            Chăm sóc khách hàng
          </div>
  
          <div className="pl-4 border-l-2 border-gray-200 space-y-2 text-gray-700">
  
            <div className="cursor-pointer hover:text-orange-500">
              Quản lý chat
            </div>
  
            <div className="cursor-pointer text-orange-500 font-medium">
              Quản lý đánh giá
            </div>
  
          </div>
  
        </nav>
  
      </div>
    );
  }