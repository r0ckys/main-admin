import React from 'react';

interface OrderSummaryChartProps {
  data: { name: string; value: number; color: string }[];
}

const icons: Record<string, React.ReactNode> = {
  Dashboard: (
    <div className="w-6 h-6 relative">
      <div className="w-2 h-2 left-0.5 top-3.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-sky-400" />
      <div className="w-2 h-2 left-3.5 top-3.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-sky-400" />
      <div className="w-2 h-2 left-0.5 top-0.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-sky-400" />
      <div className="w-2 h-2 left-3.5 top-0.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-sky-400" />
    </div>
  ),
  Orders: (
    <div className="w-6 h-6 relative">
      <div className="w-1 h-1.5 left-4.5 top-0.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-black" />
      <div className="w-4.5 h-5 left-0.5 top-0.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-black" />
      <div className="w-1 h-2 left-2 h-2.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-black" />
    </div>
  ),
  Products: (
    <div className="w-6 h-6 relative">
      <div className="w-5 h-5 left-0.5 top-0.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-black" />
      <div className="w-2.5 h-1.5 left-0.5 top-2.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-black" />
      <div className="w-2.5 h-1.5 left-2.5 top-2.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-black" />
      <div className="w-2.5 h-1.5 left-1.5 top-1.5 absolute rounded bg-gradient-to-r from-sky-400 to-blue-500 border border-black" />
    </div>
  ),
};

const OrderSummaryChart: React.FC<OrderSummaryChartProps> = ({ data }) => {
  return (
    <div className="relative w-full h-[240px] bg-[#F9F9F9] rounded-lg overflow-hidden flex flex-col justify-center">
      {/* Decorative gradient bar */}
      <div className="absolute left-8 top-[125px] w-[204px] h-[34px] opacity-20 rounded bg-gradient-to-r from-sky-400 to-blue-500" />
      {/* List */}
      <div className="absolute left-10 top-[130px] flex flex-col gap-5">
        {data.map((item, idx) => (
          <div key={item.name} className="flex items-center gap-4">
            {/* Custom icon or colored dot */}
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
            </div>
            <span className="text-base font-poppins font-medium" style={{ color: item.color }}>{item.name}</span>
            <span className="ml-auto text-base font-poppins font-semibold text-black">{item.value}</span>
          </div>
        ))}
      </div>
      {/* Title */}
      <div className="absolute left-8 top-8 text-black text-lg font-poppins font-semibold">Order Summary</div>
    </div>
  );
};

export default OrderSummaryChart;