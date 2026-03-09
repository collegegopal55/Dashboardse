


// import React from 'react';
// import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';

// const PerformanceRadarChart = ({ data = [], darkMode = false }) => {
//   // Default data if none provided
//   const defaultData = [
//     { department: 'Engineering', attendance: 95, productivity: 88, satisfaction: 92 },
//     { department: 'Sales', attendance: 88, productivity: 92, satisfaction: 85 },
//     { department: 'Marketing', attendance: 82, productivity: 85, satisfaction: 90 },
//     { department: 'HR', attendance: 90, productivity: 78, satisfaction: 95 },
//     { department: 'Finance', attendance: 92, productivity: 85, satisfaction: 80 }
//   ];

//   // Ensure data is in correct format
//   const chartData = (data && data.length > 0 ? data : defaultData).map(item => ({
//     department: item.department || 'Unknown',
//     attendance: Number(item.attendance || 0),
//     productivity: Number(item.productivity || 0),
//     satisfaction: Number(item.satisfaction || 0)
//   }));

//   const colors = {
//     text: darkMode ? '#f3f4f6' : '#111827',
//     textSecondary: darkMode ? '#9ca3af' : '#6b7280',
//     grid: darkMode ? '#4b5563' : '#e5e7eb',
//     attendance: '#3B82F6',
//     productivity: '#10B981',
//     satisfaction: '#F59E0B'
//   };

//   // Calculate responsive outer radius based on container size
//   const getOuterRadius = () => {
//     if (typeof window !== 'undefined') {
//       const width = window.innerWidth;
//       if (width < 480) return 70;  // small mobile
//       if (width < 640) return 90;   // mobile
//       if (width < 1024) return 120; // tablet
//       return 150; // desktop
//     }
//     return 120;
//   };

//   // Calculate font sizes responsively
//   const getAxisFontSize = () => {
//     if (typeof window !== 'undefined') {
//       const width = window.innerWidth;
//       if (width < 480) return 8;
//       if (width < 640) return 9;
//       if (width < 1024) return 10;
//       return 12;
//     }
//     return 10;
//   };

//   const getRadiusAxisFontSize = () => {
//     if (typeof window !== 'undefined') {
//       const width = window.innerWidth;
//       if (width < 480) return 7;
//       if (width < 640) return 8;
//       if (width < 1024) return 9;
//       return 10;
//     }
//     return 9;
//   };

 

//   // Custom tooltip
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className={`
//           p-2 sm:p-3 rounded-lg shadow-lg border text-xs sm:text-sm
//           ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
//         `}>
//           <p className={`font-medium mb-1 sm:mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {payload[0]?.payload?.department || 'Unknown'}
//           </p>
//           {payload.map((entry, index) => (
//             <div key={index} className="flex items-center justify-between gap-2 sm:gap-4">
//               <span style={{ color: entry.color }}>{entry.name}:</span>
//               <span className="font-bold">{entry.value}%</span>
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <RadarChart outerRadius={getOuterRadius()} data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
//         <PolarGrid stroke={colors.grid} />
//         <PolarAngleAxis 
//           dataKey="department" 
//           tick={{ 
//             fill: colors.text, 
//             fontSize: getAxisFontSize(),
//             dy: 3
//           }}
//         />
//         <PolarRadiusAxis 
//           angle={30} 
//           domain={[0, 100]} 
//           tick={{ 
//             fill: colors.textSecondary, 
//             fontSize: getRadiusAxisFontSize()
//           }}
//         />
//         <Radar 
//           name="Attendance" 
//           dataKey="attendance" 
//           stroke={colors.attendance} 
//           fill={colors.attendance} 
//           fillOpacity={0.3} 
//         />
//         <Radar 
//           name="Productivity" 
//           dataKey="productivity" 
//           stroke={colors.productivity} 
//           fill={colors.productivity} 
//           fillOpacity={0.3} 
//         />
//         <Radar 
//           name="Satisfaction" 
//           dataKey="satisfaction" 
//           stroke={colors.satisfaction} 
//           fill={colors.satisfaction} 
//           fillOpacity={0.3} 
//         />
      
//         <Tooltip content={<CustomTooltip />} />
//       </RadarChart>
//     </ResponsiveContainer>
//   );
// };

// export default PerformanceRadarChart;

// charts/PerformanceRadarChart.js
import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceRadarChart = ({ 
  data = [], 
  darkMode = false,
  chartType = 'department' // 'gender', 'branch', 'department', 'designation'
}) => {
  // Default data based on chart type
  const getDefaultData = () => {
    switch(chartType) {
      case 'gender':
        return [
          { category: 'Male', attendance: 92, productivity: 88, satisfaction: 85 },
          { category: 'Female', attendance: 94, productivity: 90, satisfaction: 92 },
          { category: 'Other', attendance: 88, productivity: 86, satisfaction: 90 }
        ];
      
      case 'branch':
        return [
          { category: 'Mumbai HQ', attendance: 95, productivity: 92, satisfaction: 88 },
          { category: 'Delhi NCR', attendance: 88, productivity: 90, satisfaction: 85 },
          { category: 'Bangalore', attendance: 92, productivity: 94, satisfaction: 90 },
          { category: 'Pune', attendance: 90, productivity: 88, satisfaction: 92 },
          { category: 'Chennai', attendance: 86, productivity: 85, satisfaction: 88 }
        ];
      
      case 'designation':
        return [
          { category: 'Engineers', attendance: 92, productivity: 94, satisfaction: 88 },
          { category: 'Managers', attendance: 95, productivity: 92, satisfaction: 90 },
          { category: 'Executives', attendance: 88, productivity: 86, satisfaction: 92 },
          { category: 'Directors', attendance: 98, productivity: 96, satisfaction: 94 },
          { category: 'Staff', attendance: 90, productivity: 88, satisfaction: 89 }
        ];
      
      case 'department':
      default:
        return [
          { category: 'Engineering', attendance: 95, productivity: 88, satisfaction: 92 },
          { category: 'Sales', attendance: 88, productivity: 92, satisfaction: 85 },
          { category: 'Marketing', attendance: 82, productivity: 85, satisfaction: 90 },
          { category: 'HR', attendance: 90, productivity: 78, satisfaction: 95 },
          { category: 'Finance', attendance: 92, productivity: 85, satisfaction: 80 }
        ];
    }
  };

  // Process data based on chart type
  const processData = () => {
    if (!data || data.length === 0) {
      return getDefaultData();
    }

    // If data is provided, map it according to chart type
    return data.map(item => {
      let category = '';
      switch(chartType) {
        case 'gender':
          category = item.gender || item.category || item.name || 'Unknown';
          break;
        case 'branch':
          category = item.branch || item.category || item.name || 'Unknown';
          break;
        case 'designation':
          category = item.designation || item.category || item.name || 'Unknown';
          break;
        case 'department':
        default:
          category = item.department || item.category || item.name || 'Unknown';
      }

      return {
        category,
        attendance: Number(item.attendance || item.Attendance || 0),
        productivity: Number(item.productivity || item.Productivity || 0),
        satisfaction: Number(item.satisfaction || item.Satisfaction || 0)
      };
    });
  };

  const chartData = processData();

  const colors = {
    text: darkMode ? '#f3f4f6' : '#111827',
    textSecondary: darkMode ? '#9ca3af' : '#6b7280',
    grid: darkMode ? '#4b5563' : '#e5e7eb',
    attendance: '#3B82F6',
    productivity: '#10B981',
    satisfaction: '#F59E0B'
  };

  // Calculate responsive outer radius based on container size
  const getOuterRadius = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 480) return 70;
      if (width < 640) return 90;
      if (width < 1024) return 120;
      return 150;
    }
    return 120;
  };

  // Calculate font sizes responsively
  const getAxisFontSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 480) return 8;
      if (width < 640) return 9;
      if (width < 1024) return 10;
      return 12;
    }
    return 10;
  };

  const getRadiusAxisFontSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 480) return 7;
      if (width < 640) return 8;
      if (width < 1024) return 9;
      return 10;
    }
    return 9;
  };

  // Get chart title based on type
  const getChartTitle = () => {
    switch(chartType) {
      case 'gender': return 'Gender-wise Performance';
      case 'branch': return 'Branch-wise Performance';
      case 'designation': return 'Designation-wise Performance';
      case 'department': return 'Department-wise Performance';
      default: return 'Performance Metrics';
    }
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`
          p-2 sm:p-3 rounded-lg shadow-lg border text-xs sm:text-sm
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <p className={`font-medium mb-1 sm:mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {payload[0]?.payload?.category || 'Unknown'}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-2 sm:gap-4">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="font-bold">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className={`text-sm font-medium mb-2 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {getChartTitle()}
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart outerRadius={getOuterRadius()} data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <PolarGrid stroke={colors.grid} />
          <PolarAngleAxis 
            dataKey="category" 
            tick={{ 
              fill: colors.text, 
              fontSize: getAxisFontSize(),
              dy: 3
            }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ 
              fill: colors.textSecondary, 
              fontSize: getRadiusAxisFontSize()
            }}
          />
          <Radar 
            name="Attendance" 
            dataKey="attendance" 
            stroke={colors.attendance} 
            fill={colors.attendance} 
            fillOpacity={0.3} 
          />
          <Radar 
            name="Productivity" 
            dataKey="productivity" 
            stroke={colors.productivity} 
            fill={colors.productivity} 
            fillOpacity={0.3} 
          />
          <Radar 
            name="Satisfaction" 
            dataKey="satisfaction" 
            stroke={colors.satisfaction} 
            fill={colors.satisfaction} 
            fillOpacity={0.3} 
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceRadarChart;