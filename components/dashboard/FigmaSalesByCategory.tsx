import React from 'react';

interface CategoryData {
  name: string;
  percentage: number;
  color: string;
}

interface FigmaSalesByCategoryProps {
  categories?: CategoryData[];
}

const FigmaSalesByCategory: React.FC<FigmaSalesByCategoryProps> = ({
  categories = [
    { name: 'Hair care', percentage: 15, color: '#3B82F6' },
    { name: 'Serum', percentage: 15, color: '#F97316' },
    { name: 'Cream', percentage: 15, color: '#FBBF24' },
    { name: 'Home & kitchen', percentage: 15, color: '#EF4444' },
    { name: 'Lip care', percentage: 15, color: '#8B5CF6' },
    { name: 'Air Conditioner', percentage: 15, color: '#06B6D4' },
    { name: 'Skin care', percentage: 10, color: '#10B981' }
  ]
}) => {
  // Calculate angles for pie chart
  let currentAngle = 0;
  const segments = categories.map((category) => {
    const angle = (category.percentage / 100) * 360;
    const segment = {
      ...category,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      angle
    };
    currentAngle += angle;
    return segment;
  });

  // Function to create SVG path for pie segment
  const createPath = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number = 0) => {
    const start = polarToCartesian(100, 100, outerRadius, endAngle);
    const end = polarToCartesian(100, 100, outerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    if (innerRadius > 0) {
      const innerStart = polarToCartesian(100, 100, innerRadius, endAngle);
      const innerEnd = polarToCartesian(100, 100, innerRadius, startAngle);
      return [
        "M", start.x, start.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
        "L", innerEnd.x, innerEnd.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
        "Z"
      ].join(" ");
    } else {
      return [
        "M", start.x, start.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
        "L", 100, 100,
        "Z"
      ].join(" ");
    }
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Sale By Category</h3>
      
      <div className="flex flex-col items-center flex-1">
        {/* Pie Chart */}
        <div className="w-40 h-40 mb-6">
          <svg width="100%" height="100%" viewBox="0 0 200 200" className="transform -rotate-90">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={createPath(segment.startAngle, segment.endAngle, 85, 45)}
                fill={segment.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
                title={`${segment.name}: ${segment.percentage}%`}
              />
            ))}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: category.color }}
              ></div>
              <span className="text-xs text-gray-600 truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {category.name}({category.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FigmaSalesByCategory;
