


// import React, { useMemo, useState, useEffect } from 'react';
// import TrendComposedChart from '../../../charts/TrendComposedChart';
// import { useTheme } from '../../../context/ThemeContext';

// const TrendChartContainer = ({ data = [] }) => {
//   const { darkMode } = useTheme();
//   const [dimensions, setDimensions] = useState({ width: 0 });

//   // Default data - memoized
//   const defaultData = useMemo(() => [
//     { month: 'Jan', attendance: 92, overtime: 45, late: 12, trend: 88 },
//     { month: 'Feb', attendance: 88, overtime: 52, late: 18, trend: 85 },
//     { month: 'Mar', attendance: 95, overtime: 38, late: 8, trend: 92 },
//     { month: 'Apr', attendance: 86, overtime: 58, late: 22, trend: 82 },
//     { month: 'May', attendance: 90, overtime: 42, late: 14, trend: 87 },
//     { month: 'Jun', attendance: 93, overtime: 48, late: 10, trend: 90 },
//     { month: 'Jul', attendance: 89, overtime: 55, late: 16, trend: 86 }
//   ], []);

//   // Track window width for responsive adjustments
//   useEffect(() => {
//     const handleResize = () => {
//       setDimensions({ width: window.innerWidth });
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Process data - memoized
//   const processedData = useMemo(() => {
//     const sourceData = data && data.length > 0 ? data : defaultData;
    
//     return sourceData.map(item => ({
//       month: item.month || 'Unknown',
//       attendance: Number(item.attendance || item.present || 0),
//       overtime: Number(item.overtime || 0),
//       late: Number(item.late || 0),
//       trend: Number(item.trend || 0)
//     }));
//   }, [data, defaultData]);

//   // Calculate averages - memoized
//   const averages = useMemo(() => {
//     const totals = processedData.reduce((acc, item) => {
//       acc.attendance += item.attendance;
//       acc.overtime += item.overtime;
//       acc.late += item.late;
//       return acc;
//     }, { attendance: 0, overtime: 0, late: 0 });

//     const count = processedData.length || 1;
    
//     return {
//       attendance: Math.round(totals.attendance / count),
//       overtime: Math.round(totals.overtime / count),
//       late: Math.round(totals.late / count)
//     };
//   }, [processedData]);

//   // Responsive chart height
//   const getChartHeight = () => {
//     if (dimensions.width < 640) return '250px';
//     if (dimensions.width < 1024) return '280px';
//     return '300px';
//   };

//   return (
//     <div 
//       className={`
//         p-3 sm:p-4 rounded-xl shadow-sm border w-full h-full flex flex-col
//         ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
//       `}
//     >
//       <h2 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex-shrink-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//         Attendance Trend 2026
//       </h2>
      
//       {/* Chart container with responsive height */}
//       <div className="w-full" style={{ height: getChartHeight() }}>
//         <TrendComposedChart 
//           data={processedData} 
//           darkMode={darkMode}
//         />
//       </div>

     
//     </div>
//   );
// };

// export default TrendChartContainer;  


import React, { useMemo, useState, useEffect } from 'react';
import TrendComposedChart from '../../../charts/TrendComposedChart';
import { useTheme } from '../../../context/ThemeContext';

const TrendChartContainer = ({ data = [] }) => {
  const { darkMode } = useTheme();
  const [dimensions, setDimensions] = useState({ width: 0 });

  // Get current date information
  const currentDate = useMemo(() => {
    const now = new Date();
    return {
      month: now.toLocaleString('default', { month: 'short' }),
      monthIndex: now.getMonth(),
      fullMonth: now.toLocaleString('default', { month: 'long' }),
      year: now.getFullYear()
    };
  }, []);

  // Generate months for current year only
  const getCurrentYearMonths = useMemo(() => {
    const months = [];
    const currentYear = currentDate.year;
    
    // Generate all months from Jan to Dec of current year
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, i, 1);
      months.push({
        month: date.toLocaleString('default', { month: 'short' }),
        year: currentYear,
        fullMonth: date.toLocaleString('default', { month: 'long' }),
        monthIndex: i,
        isCurrentMonth: i === currentDate.monthIndex,
        isFutureMonth: i > currentDate.monthIndex
      });
    }
    return months;
  }, [currentDate.year, currentDate.monthIndex]);

  // Default data generator for current year only
  const generateDefaultData = useMemo(() => {
    const baseData = [
      { attendance: 92, overtime: 45, late: 12, trend: 88 },
      { attendance: 88, overtime: 52, late: 18, trend: 85 },
      { attendance: 95, overtime: 38, late: 8, trend: 92 },
      { attendance: 86, overtime: 58, late: 22, trend: 82 },
      { attendance: 90, overtime: 42, late: 14, trend: 87 },
      { attendance: 93, overtime: 48, late: 10, trend: 90 },
      { attendance: 89, overtime: 55, late: 16, trend: 86 },
      { attendance: 91, overtime: 44, late: 13, trend: 89 },
      { attendance: 87, overtime: 56, late: 19, trend: 84 },
      { attendance: 94, overtime: 41, late: 9, trend: 91 },
      { attendance: 88, overtime: 53, late: 17, trend: 86 },
      { attendance: 90, overtime: 47, late: 15, trend: 88 }
    ];

    // Map to current year months
    return getCurrentYearMonths.map((monthInfo, index) => ({
      month: monthInfo.month,
      year: monthInfo.year,
      displayMonth: `${monthInfo.month} ${monthInfo.year}`,
      attendance: baseData[index].attendance,
      overtime: baseData[index].overtime,
      late: baseData[index].late,
      trend: baseData[index].trend,
      isCurrentMonth: monthInfo.isCurrentMonth,
      isFutureMonth: monthInfo.isFutureMonth
    }));
  }, [getCurrentYearMonths]);

  // Track window width for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Process data - memoized with current year filtering
  const processedData = useMemo(() => {
    const sourceData = data && data.length > 0 ? data : generateDefaultData;
    
    // Filter for current year only
    const currentYear = currentDate.year;
    
    // If data has year information, filter by current year
    if (sourceData[0]?.year) {
      return sourceData
        .filter(item => item.year === currentYear)
        .sort((a, b) => {
          // Sort by month
          const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
        })
        .map((item, index) => ({
          ...item,
          month: dimensions.width < 640 ? item.month : `${item.month}`,
          isCurrentMonth: getCurrentYearMonths[index]?.isCurrentMonth || false,
          isFutureMonth: getCurrentYearMonths[index]?.isFutureMonth || false
        }));
    }
    
    // If no year info, assume data is for current year months
    return getCurrentYearMonths.map((monthInfo, index) => {
      const existingData = sourceData[index] || {};
      return {
        month: dimensions.width < 640 ? monthInfo.month : monthInfo.month,
        shortMonth: monthInfo.month,
        year: monthInfo.year,
        attendance: Number(existingData.attendance || existingData.present || generateDefaultData[index].attendance),
        overtime: Number(existingData.overtime || generateDefaultData[index].overtime),
        late: Number(existingData.late || generateDefaultData[index].late),
        trend: Number(existingData.trend || generateDefaultData[index].trend),
        isCurrentMonth: monthInfo.isCurrentMonth,
        isFutureMonth: monthInfo.isFutureMonth
      };
    });
  }, [data, generateDefaultData, currentDate, getCurrentYearMonths, dimensions.width]);

  // Filter to show only months up to current month
  const chartData = useMemo(() => {
    return processedData.filter(item => !item.isFutureMonth);
  }, [processedData]);

  // Calculate averages - memoized
  const averages = useMemo(() => {
    const totals = chartData.reduce((acc, item) => {
      acc.attendance += item.attendance || 0;
      acc.overtime += item.overtime || 0;
      acc.late += item.late || 0;
      return acc;
    }, { attendance: 0, overtime: 0, late: 0 });

    const count = chartData.length || 1;
    
    return {
      attendance: Math.round(totals.attendance / count),
      overtime: Math.round(totals.overtime / count),
      late: Math.round(totals.late / count)
    };
  }, [chartData]);

  // Get current month data
  const currentMonthData = useMemo(() => {
    return chartData.find(item => item.isCurrentMonth) || chartData[chartData.length - 1];
  }, [chartData]);

  // Responsive chart height
  const getChartHeight = () => {
    if (dimensions.width < 640) return '250px';
    if (dimensions.width < 1024) return '280px';
    return '300px';
  };

  // Get title with current year
  const getChartTitle = () => {
    if (dimensions.width < 640) {
      return `Trends ${currentDate.year}`;
    }
    return `Attendance & Performance Trends - ${currentDate.year}`;
  };

  // Get month range display
  const getMonthRange = () => {
    if (chartData.length === 0) return 'No data';
    
    const firstMonth = chartData[0]?.month || 'Jan';
    const lastMonth = chartData[chartData.length - 1]?.month || 'Dec';
    const year = currentDate.year;
    
    return `${firstMonth} - ${lastMonth} ${year}`;
  };

  return (
    <div 
      className={`
        p-3 sm:p-4 rounded-xl shadow-sm border w-full h-full flex flex-col
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
      `}
    >
      {/* Header with current year indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {getChartTitle()}
          </h2>
          <span className={`
            text-xs px-2 py-1 rounded-full font-medium
            ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}
          `}>
            YTD {currentDate.year}
          </span>
        </div>
        
        {/* Current month highlight */}
        {currentMonthData && (
          <div className={`
            mt-1 sm:mt-0 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full flex items-center gap-1
            ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-700'}
          `}>
            <span className="font-medium">{currentDate.fullMonth}:</span>
            <span>Att {currentMonthData.attendance}%</span>
            <span className="text-gray-400">|</span>
            <span>OT {currentMonthData.overtime}</span>
            <span className="text-gray-400">|</span>
            <span>Late {currentMonthData.late}</span>
          </div>
        )}
      </div>
      
      {/* Chart container with responsive height */}
      <div className="w-full flex-1" style={{ height: getChartHeight() }}>
        <TrendComposedChart 
          data={chartData} 
          darkMode={darkMode}
        />
      </div>

      {/* Progress indicator */}
      <div className="mt-3 space-y-2">
        {/* Month progress bar */}
        <div className="flex items-center gap-2">
          <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Year Progress:
          </span>
          <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${((currentDate.monthIndex + 1) / 12) * 100}%` }}
            />
          </div>
          <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {currentDate.monthIndex + 1}/12 months
          </span>
        </div>

        {/* Period indicator footer */}
        <div className={`
          text-xs text-center
          ${darkMode ? 'text-gray-500' : 'text-gray-400'}
        `}>
          Showing data for {getMonthRange()}
        </div>
      </div>
    </div>
  );
};

export default TrendChartContainer;