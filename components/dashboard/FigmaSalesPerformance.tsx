import React from 'react';

interface ChartData {
  month: string;
  placedOrder: number;
  delivered: number;
  canceled: number;
}

interface FigmaSalesPerformanceProps {
  data?: ChartData[];
}

const FigmaSalesPerformance: React.FC<FigmaSalesPerformanceProps> = ({
  data = [
    { month: '1', placedOrder: 20, delivered: 15, canceled: 5 },
    { month: '2', placedOrder: 25, delivered: 20, canceled: 3 },
    { month: '3', placedOrder: 35, delivered: 28, canceled: 5 },
    { month: '4', placedOrder: 30, delivered: 25, canceled: 8 },
    { month: '5', placedOrder: 45, delivered: 38, canceled: 6 },
    { month: '6', placedOrder: 40, delivered: 35, canceled: 4 },
    { month: '7', placedOrder: 50, delivered: 42, canceled: 8 },
    { month: '8', placedOrder: 55, delivered: 48, canceled: 7 },
    { month: '9', placedOrder: 48, delivered: 40, canceled: 9 },
    { month: '10', placedOrder: 52, delivered: 45, canceled: 6 },
    { month: '11', placedOrder: 60, delivered: 52, canceled: 8 },
    { month: '12', placedOrder: 70, delivered: 60, canceled: 10 },
    { month: '13', placedOrder: 65, delivered: 55, canceled: 9 },
    { month: '14', placedOrder: 72, delivered: 62, canceled: 8 },
    { month: '15', placedOrder: 68, delivered: 58, canceled: 10 },
    { month: '16', placedOrder: 75, delivered: 65, canceled: 8 },
    { month: '17', placedOrder: 80, delivered: 70, canceled: 9 },
    { month: '18', placedOrder: 78, delivered: 68, canceled: 10 },
    { month: '19', placedOrder: 72, delivered: 62, canceled: 8 },
    { month: '20', placedOrder: 68, delivered: 58, canceled: 9 },
    { month: '21', placedOrder: 62, delivered: 52, canceled: 8 },
    { month: '22', placedOrder: 58, delivered: 48, canceled: 8 },
    { month: '23', placedOrder: 52, delivered: 42, canceled: 8 },
    { month: '24', placedOrder: 48, delivered: 38, canceled: 8 },
    { month: '25', placedOrder: 55, delivered: 45, canceled: 8 },
    { month: '26', placedOrder: 60, delivered: 50, canceled: 8 },
    { month: '27', placedOrder: 58, delivered: 48, canceled: 8 },
    { month: '28', placedOrder: 52, delivered: 42, canceled: 8 },
    { month: '29', placedOrder: 48, delivered: 40, canceled: 6 },
    { month: '30', placedOrder: 45, delivered: 38, canceled: 5 },
    { month: '31', placedOrder: 42, delivered: 35, canceled: 5 }
  ]
}) => {
  const maxValue = Math.max(...data.flatMap(d => [d.placedOrder, d.delivered, d.canceled]));
  
  const createSmoothPath = (values: number[], chartWidth: number, chartHeight: number) => {
    const points = values.map((value, index) => ({
      x: (index / (values.length - 1)) * chartWidth,
      y: chartHeight - (value / maxValue) * (chartHeight - 20)
    }));

    if (points.length < 2) return '';

    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const controlPointX = (current.x + next.x) / 2;
      path += ` C ${controlPointX},${current.y} ${controlPointX},${next.y} ${next.x},${next.y}`;
    }
    
    return path;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Sale Performance</h3>
      
      <div className="flex gap-6 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-blue-500 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Placed Order</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-green-500 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Order Delivered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-orange-500 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Order Cancel</span>
        </div>
      </div>
      
      <div className="relative h-64">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 pr-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>
        
        <div className="ml-8 h-full relative">
          <div className="absolute inset-0">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="absolute w-full border-t border-gray-100" style={{ top: `${i * 25}%` }} />
            ))}
          </div>
          
          <svg className="w-full h-full" viewBox={`0 0 700 250`} preserveAspectRatio="none">
            <path
              d={createSmoothPath(data.map(d => d.placedOrder), 700, 250)}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
            />
            
            <path
              d={createSmoothPath(data.map(d => d.delivered), 700, 250)}
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
            />
            
            <path
              d={createSmoothPath(data.map(d => d.canceled), 700, 250)}
              fill="none"
              stroke="#F97316"
              strokeWidth="2"
            />
          </svg>
          
          <div className="flex justify-between mt-2 text-[10px] text-gray-400 overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {data.filter((_, i) => i % 3 === 0).map((item, index) => (
              <span key={index}>{item.month}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaSalesPerformance;
