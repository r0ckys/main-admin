import React from 'react';
import { Search } from 'lucide-react';

interface TopProduct {
  id: string;
  name: string;
  itemCode: string;
  price: string;
  image?: string;
}

interface FigmaTopProductsProps {
  products?: TopProduct[];
}

const FigmaTopProducts: React.FC<FigmaTopProductsProps> = ({
  products = [
    {
      id: '1',
      name: 'Apple iPhone 13',
      itemCode: '#FXZ-4567',
      price: '$999.00'
    },
    {
      id: '2',
      name: 'Nike Air Jordan',
      itemCode: '#FXZ-4567',
      price: '$72.40'
    },
    {
      id: '3',
      name: 'T-shirt',
      itemCode: '#FXZ-4567',
      price: '$35.40'
    },
    {
      id: '4',
      name: 'Assorted Cross Bag',
      itemCode: '#FXZ-4567',
      price: '$80.00'
    }
  ]
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Top Products</h3>
          <span className="text-sm text-blue-500 cursor-pointer hover:underline" style={{ fontFamily: 'Poppins, sans-serif' }}>All product</span>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-100">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-3 flex-1">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            {/* Product Image */}
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-sm text-gray-500">{product.name.charAt(0)}</span>
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>Item: {product.itemCode}</p>
            </div>
            
            {/* Price */}
            <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {product.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FigmaTopProducts;
