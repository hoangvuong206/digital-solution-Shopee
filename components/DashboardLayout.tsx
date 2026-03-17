import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1 min-h-screen flex flex-col">

        <Header />

        <div className="p-6">
          <div className="bg-white rounded shadow p-6">
            {children}
          </div>
        </div>

      </div>

    </div>
  );
}