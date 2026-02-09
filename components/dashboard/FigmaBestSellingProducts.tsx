import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  image?: string;
  totalOrder: string;
  status: 'In Stock' | 'Stock out' | 'Low Stock';
  price: string;
}

interface FigmaBestSellingProductsProps {
  products?: Product[];
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'In Stock':
      return { bg: 'bg-emerald-50', text: 'text-emerald-500' };
    case 'Stock out':
      return { bg: 'bg-red-50', text: 'text-red-500' };
    case 'Low Stock':
      return { bg: 'bg-amber-50', text: 'text-amber-500' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-500' };
  }
};

const FigmaBestSellingProducts: React.FC<FigmaBestSellingProductsProps> = ({
  products = [
    {
      id: '1',
      name: 'Apple iPhone 13',
      totalOrder: '104',
      status: 'In Stock',
      price: '$999.00'
    },
    {
      id: '2',
      name: 'Nike Air Jordan',
      totalOrder: '56',
      status: 'Stock out',
      price: '$999.00'
    },
    {
      id: '3',
      name: 'T-shirt',
      totalOrder: '266',
      status: 'In Stock',
      price: '$999.00'
    },
    {
      id: '4',
      name: 'Cross Bag',
      totalOrder: '506',
      status: 'In Stock',
      price: '$999.00'
    }
  ]
}) => {
  const [activeFilter, setActiveFilter] = useState('All Time');
  const filters = ['Day', 'Month', 'Year', 'All Time'];

  return (
    <div 
      className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 hover:shadow-lg transition-shadow duration-300"
      style={{ 
        boxShadow: '0px 2px 9.6px rgba(0, 0, 0, 0.08)',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      {/* Header with filters */}
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-zinc-800">Best Selling Product</h3>
        
        {/* Time filters */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs lg:text-sm font-medium transition-all whitespace-nowrap hover:shadow-sm ${
                activeFilter === filter
                  ? 'text-white shadow-md'
                  : 'text-zinc-600 hover:bg-zinc-100'
              }`}
              style={activeFilter === filter ? {
                background: 'linear-gradient(180deg, #F97316 0%, #F59E0B 100%)'
              } : {}}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-5 lg:-mx-6 xl:-mx-8">
        <div className="min-w-[360px] px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200">
                <th 
                  className="text-left py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-base font-medium text-zinc-500"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  Product
                </th>
                <th 
                  className="text-left py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-base font-medium text-zinc-500 hidden xs:table-cell"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  Total Order
                </th>
                <th 
                  className="text-left py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-base font-medium text-zinc-500"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  Status
                </th>
                <th 
                  className="text-right py-2 sm:py-3 lg:py-4 text-xs sm:text-sm lg:text-base font-medium text-zinc-500"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const statusStyles = getStatusStyles(product.status);
                return (
                  <tr 
                    key={product.id} 
                    className={`hover:bg-zinc-50 transition-colors cursor-pointer ${index !== products.length - 1 ? 'border-b border-zinc-100' : ''}`}
                  >
                    <td className="py-2 sm:py-3 md:py-4 lg:py-5">
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-zinc-100 rounded-md sm:rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs sm:text-sm lg:text-base text-zinc-400 font-medium">{product.name.charAt(0)}</span>
                          )}
                        </div>
                        <span 
                          className="text-xs sm:text-sm lg:text-base font-medium text-zinc-700 truncate max-w-[80px] sm:max-w-[120px] md:max-w-none"
                          style={{ fontFamily: 'Lato, sans-serif' }}
                        >
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 sm:py-3 md:py-4 lg:py-5 hidden xs:table-cell">
                      <span 
                        className="text-xs sm:text-sm lg:text-base text-zinc-600"
                        style={{ fontFamily: 'Lato, sans-serif' }}
                      >
                        {product.totalOrder}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 md:py-4 lg:py-5">
                      <span 
                        className={`inline-flex items-center px-2 sm:px-3 lg:px-4 py-0.5 sm:py-1 lg:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium ${statusStyles.bg} ${statusStyles.text}`}
                        style={{ fontFamily: 'Lato, sans-serif' }}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 md:py-4 lg:py-5 text-right">
                      <span 
                        className="text-xs sm:text-sm lg:text-base font-semibold text-zinc-700"
                        style={{ fontFamily: 'Lato, sans-serif' }}
                      >
                        {product.price}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Details button */}
      <div className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 flex justify-end">
        <button 
          className="px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 lg:py-2.5 rounded-md sm:rounded-lg border border-sky-400 text-sky-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all duration-300 shadow-sm hover:shadow-md"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          <span className="text-xs sm:text-sm lg:text-base font-medium">Details</span>
        </button>
      </div>
    </div>
  );
};

export default FigmaBestSellingProducts;
