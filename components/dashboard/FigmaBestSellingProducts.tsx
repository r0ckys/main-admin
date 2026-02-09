import React from 'react';
import { MoreHorizontal } from 'lucide-react';

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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'Stock out':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Low Stock':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
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
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Best Selling Product</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>Product</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>Total Order</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className={index !== products.length - 1 ? 'border-b border-gray-50' : ''}>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">{product.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.totalOrder}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {product.status}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>{product.price}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="px-5 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity shadow-sm">
          <span className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Details</span>
        </button>
      </div>
    </div>
  );
};

export default FigmaBestSellingProducts;
