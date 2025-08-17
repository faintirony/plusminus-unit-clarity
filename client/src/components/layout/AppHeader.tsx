import { Link, useLocation } from 'wouter';

export default function AppHeader() {
  const [location] = useLocation();

  const isStoresActive = location === '/app/stores';
  const isProductsActive = location === '/app/products' || location === '/app';

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-6">
            <h1 className="text-lg font-semibold text-gray-900">ПлюсМинус</h1>
            
            {/* Navigation */}
            <nav className="flex space-x-6">
              <Link href="/app/stores">
                <button 
                  className={`text-sm font-medium pb-3 transition-colors ${
                    isStoresActive 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  data-testid="nav-stores"
                >
                  Магазины
                </button>
              </Link>
              <Link href="/app/products">
                <button 
                  className={`text-sm font-medium pb-3 transition-colors ${
                    isProductsActive 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  data-testid="nav-products"
                >
                  Товары
                </button>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}