import { SquarePlus, TableIcon, ChartLineIcon, PlugIcon, DownloadIcon, CogIcon, UserIcon } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { icon: TableIcon, label: "Товары", active: true },
    { icon: ChartLineIcon, label: "Аналитика", active: false },
    { icon: PlugIcon, label: "Интеграции", active: false },
    { icon: DownloadIcon, label: "Экспорт", active: false },
    { icon: CogIcon, label: "Настройки", active: false },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-semibold text-blue-600">ПлюсМинус</span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              data-testid={`nav-${item.label.toLowerCase()}`}
              className={`sidebar-item flex items-center px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors ${
                item.active
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </div>
          );
        })}
      </nav>
      
      {/* User Profile */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3" data-testid="user-profile">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Мария Селлер</p>
            <p className="text-xs text-gray-500 truncate">maria@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
