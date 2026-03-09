

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const AttendanceChart = ({ data = [], darkMode = false, width, height }) => {
//   // Process data to ensure correct format
//   const processedData = data.map(item => ({
//     day: item.day || 'Unknown',
//     present: Number(item.present) || 0,
//     late: Number(item.late) || 0,
//     absent: Number(item.absent) || 0,
//     leave: Number(item.leave) || 0,
//     tour: Number(item.tour) || 0,
//     holiday: Number(item.holiday) || 0,
//     weekend: Number(item.weekend) || 0
//   }));

//   // Calculate total for each day to set XAxis domain
//   const dataWithTotal = processedData.map(item => ({
//     ...item,
//     total: item.present + item.late + item.absent + item.leave + item.tour + item.holiday + item.weekend
//   }));

//   const maxValue = Math.max(...dataWithTotal.map(d => d.total), 100) + 20;

//   // Custom tooltip
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);
      
//       return (
//         <div className={`
//           p-3 rounded-lg shadow-lg border
//           ${darkMode 
//             ? 'bg-gray-800 border-gray-700 text-white' 
//             : 'bg-white border-gray-200 text-gray-900'
//           }
//         `}>
//           <p className="text-sm font-medium mb-2 border-b pb-1 dark:border-gray-700">
//             {label}
//           </p>
//           {payload.map((entry, index) => (
//             entry.value > 0 && (
//               <div key={index} className="flex items-center justify-between gap-6 text-xs py-1">
//                 <span style={{ color: entry.color }}>{entry.name}:</span>
//                 <span className="font-medium">{entry.value}</span>
//               </div>
//             )
//           ))}
//           <div className="mt-2 pt-2 border-t dark:border-gray-700">
//             <div className="flex items-center justify-between gap-6 text-xs font-semibold">
//               <span>Total:</span>
//               <span>{total}</span>
//             </div>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Define chart colors
//   const chartConfig = {
//     present: { color: '#10B981', name: 'Present' },
//     late: { color: '#F59E0B', name: 'Late' },
//     absent: { color: '#EF4444', name: 'Absent' },
//     leave: { color: '#8B5CF6', name: 'Leave' },
//     tour: { color: '#EC4899', name: 'Tour' },
//     holiday: { color: '#14B8A6', name: 'Holiday' },
//     weekend: { color: '#6B7280', name: 'Weekend' }
//   };

//   // Calculate bar height (thickness of horizontal bars)
//      const barHeight = Math.min(30, Math.max(15, Math.floor(height / 12)));

//   return (
//     <BarChart
//       width={width}
//       height={height}
//       data={processedData}
//       layout="vertical"  // YEH IMPORTANT HAI - vertical layout = horizontal bars
//       margin={{ left: 50, right: 20, top: 10 }}
//       barSize={barHeight}
//       barGap={2}
//       maxBarSize={40}
//     >
//       <CartesianGrid 
//         strokeDasharray="3 3" 
//         stroke={darkMode ? '#374151' : '#e5e7eb'} 
//         horizontal={true}  // Horizontal grid lines
//         vertical={false}    // Vertical grid lines band karo
//       />
      
//       {/* Y-axis ab categories show karega (days) */}
//       <YAxis 
//         type="category"
//         dataKey="day"
//         axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
//         tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
//         tick={{ 
//           fill: darkMode ? '#9CA3AF' : '#4B5563',
//           fontSize: 12,
//           fontWeight: 500
//         }}
//         width={40}
//         interval={0}
//       />
      
//       {/* X-axis ab values show karega (numbers) */}
//       <XAxis 
//         type="number"
//         domain={[0, maxValue]}
//         axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
//         tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
//         tick={{ 
//           fill: darkMode ? '#9CA3AF' : '#4B5563',
//           fontSize: 11
//         }}
//         height={10}
//       />
      
//       <Tooltip 
//         content={<CustomTooltip />}
//         cursor={{ 
//           fill: darkMode ? '#374151' : '#F3F4F6',
//           opacity: 0.5
//         }}
//       />
      
//       <Legend 
//         wrapperStyle={{ 
//           color: darkMode ? '#FFFFFF' : '#000000',
//           paddingTop: '20px',
//           fontSize: '11px',
//           lineHeight: '20px'
//         }}
//         iconType="circle"
//         iconSize={8}
//         layout="horizontal"
//         verticalAlign="bottom"
//         align="center"
//       />
      
//       {Object.entries(chartConfig).map(([key, config]) => (
//         <Bar 
//           key={key}
//           dataKey={key}
//           stackId="a"
//           fill={config.color}
//           name={config.name}
//           radius={[0, 4, 4, 0]}  // Sirf right side rounded
//           barSize={barHeight}
//         />
//       ))}
//     </BarChart>
//   );
// };

// export default AttendanceChart;

import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AttendanceChart = ({ data = [], darkMode = false, width, height }) => {
  // State for filters
  const [filters, setFilters] = useState({
    absent: true,
    holiday: true,
    late: true,
    leave: true,
    tour: true,
    weekend: true
  });

  // Process data to ensure correct format
  const processedData = useMemo(() => {
    return data.map(item => ({
      day: item.day || 'Unknown',
      present: Number(item.present) || 0,
      late: Number(item.late) || 0,
      absent: Number(item.absent) || 0,
      leave: Number(item.leave) || 0,
      tour: Number(item.tour) || 0,
      holiday: Number(item.holiday) || 0,
      weekend: Number(item.weekend) || 0
    }));
  }, [data]);

  // Calculate total for each day based on active filters
  const dataWithTotal = useMemo(() => {
    return processedData.map(item => {
      let total = item.present; // Present always included
      
      // Add only filtered categories
      if (filters.late) total += item.late;
      if (filters.absent) total += item.absent;
      if (filters.leave) total += item.leave;
      if (filters.tour) total += item.tour;
      if (filters.holiday) total += item.holiday;
      if (filters.weekend) total += item.weekend;
      
      return {
        ...item,
        total
      };
    });
  }, [processedData, filters]);

  const maxValue = Math.max(...dataWithTotal.map(d => d.total), 100) + 20;

  // Toggle filter function
  const toggleFilter = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Select/Deselect all function
  const toggleAll = () => {
    const allSelected = Object.values(filters).every(v => v === true);
    const newFilters = {};
    Object.keys(filters).forEach(key => {
      newFilters[key] = !allSelected;
    });
    setFilters(newFilters);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);
      
      return (
        <div className={`
          p-3 rounded-lg shadow-lg border
          ${darkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-gray-200 text-gray-900'
          }
        `}>
          <p className="text-sm font-medium mb-2 border-b pb-1 dark:border-gray-700">
            {label}
          </p>
          {payload.map((entry, index) => (
            entry.value > 0 && (
              <div key={index} className="flex items-center justify-between gap-6 text-xs py-1">
                <span style={{ color: entry.color }}>{entry.name}:</span>
                <span className="font-medium">{entry.value}</span>
              </div>
            )
          ))}
          <div className="mt-2 pt-2 border-t dark:border-gray-700">
            <div className="flex items-center justify-between gap-6 text-xs font-semibold">
              <span>Total:</span>
              <span>{total}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Filter buttons component
  const FilterControls = () => (
    <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Filter Categories
        </h3>
        <button
          onClick={toggleAll}
          className={`text-xs px-2 py-1 rounded ${
            darkMode 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {Object.values(filters).every(v => v === true) ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.entries(chartConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => toggleFilter(key)}
            className={`
              inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium
              transition-all duration-200 border
              ${filters[key] 
                ? 'bg-opacity-20 border-opacity-50' 
                : 'opacity-40 hover:opacity-60'
              }
            `}
            style={{
              backgroundColor: filters[key] ? `${config.color}20` : 'transparent',
              borderColor: config.color,
              color: darkMode ? '#fff' : '#000'
            }}
          >
            <span 
              className="w-2 h-2 rounded-full mr-1.5"
              style={{ backgroundColor: config.color }}
            />
            {config.name}
          </button>
        ))}
      </div>
    </div>
  );

  // Define chart colors
  const chartConfig = {
    present: { color: '#10B981', name: 'Present' },
    late: { color: '#F59E0B', name: 'Late' },
    absent: { color: '#EF4444', name: 'Absent' },
    leave: { color: '#8B5CF6', name: 'Leave' },
    tour: { color: '#EC4899', name: 'Tour' },
    holiday: { color: '#14B8A6', name: 'Holiday' },
    weekend: { color: '#6B7280', name: 'Weekend' }
  };

  // Calculate bar height
  const barHeight = Math.min(30, Math.max(15, Math.floor(height / 12)));

  return (
    <div className="w-full">
      <FilterControls />
      
      {/* Filter Summary */}
      <div className={`mb-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Showing: {Object.entries(filters)
          .filter(([_, value]) => value)
          .map(([key]) => chartConfig[key]?.name)
          .join(', ') || 'None'}
      </div>

      <BarChart
        width={width}
        height={height}
        data={processedData}
        layout="vertical"
        margin={{ left: 50, right: 20, top: 10 }}
        barSize={barHeight}
        barGap={2}
        maxBarSize={40}
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={darkMode ? '#374151' : '#e5e7eb'} 
          horizontal={true}
          vertical={false}
        />
        
        <YAxis 
          type="category"
          dataKey="day"
          axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
          tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
          tick={{ 
            fill: darkMode ? '#9CA3AF' : '#4B5563',
            fontSize: 12,
            fontWeight: 500
          }}
          width={40}
          interval={0}
        />
        
        <XAxis 
          type="number"
          domain={[0, maxValue]}
          axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
          tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
          tick={{ 
            fill: darkMode ? '#9CA3AF' : '#4B5563',
            fontSize: 11
          }}
          height={10}
        />
        
        <Tooltip 
          content={<CustomTooltip />}
          cursor={{ 
            fill: darkMode ? '#374151' : '#F3F4F6',
            opacity: 0.5
          }}
        />
        
        <Legend 
          wrapperStyle={{ 
            color: darkMode ? '#FFFFFF' : '#000000',
            paddingTop: '20px',
            fontSize: '11px',
            lineHeight: '20px'
          }}
          iconType="circle"
          iconSize={8}
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
        
        {Object.entries(chartConfig).map(([key, config]) => (
          filters[key] && (
            <Bar 
              key={key}
              dataKey={key}
              stackId="a"
              fill={config.color}
              name={config.name}
              radius={[0, 4, 4, 0]}
              barSize={barHeight}
            />
          )
        ))}
      </BarChart>
    </div>
  );
};

export default AttendanceChart;