

// import React, { useState, useEffect, useRef } from 'react';
// import PerformanceRadarChart from '../../../charts/PerformanceRadarChart';
// import { useTheme } from '../../../context/ThemeContext';

// const PerformanceChartContainer = ({ data = [] }) => {
//   const { darkMode } = useTheme();
//   const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
//   const [isReady, setIsReady] = useState(false);
//   const containerRef = useRef(null);

//   // Default data
//   const defaultData = [
//     { department: 'Engineering', attendance: 95, productivity: 88, satisfaction: 92 },
//     { department: 'Sales', attendance: 88, productivity: 92, satisfaction: 85 },
//     { department: 'Marketing', attendance: 82, productivity: 85, satisfaction: 90 },
//     { department: 'HR', attendance: 90, productivity: 78, satisfaction: 95 },
//     { department: 'Finance', attendance: 92, productivity: 85, satisfaction: 80 }
//   ];

//   // Process data
//   const processedData = (data && data.length > 0 ? data : defaultData).map(item => ({
//     department: item.department || 'Unknown',
//     attendance: Number(item.attendance || item.Attendance || 0),
//     productivity: Number(item.productivity || item.Productivity || 0),
//     satisfaction: Number(item.satisfaction || item.Satisfaction || 0)
//   }));

//   // Calculate averages
//   const averages = processedData.reduce((acc, item) => {
//     acc.attendance += item.attendance;
//     acc.productivity += item.productivity;
//     acc.satisfaction += item.satisfaction;
//     return acc;
//   }, { attendance: 0, productivity: 0, satisfaction: 0 });

//   const avgAttendance = Math.round(averages.attendance / processedData.length);
//   const avgProductivity = Math.round(averages.productivity / processedData.length);
//   const avgSatisfaction = Math.round(averages.satisfaction / processedData.length);

//   // Measure container with responsive adjustments
//   useEffect(() => {
//     const measureDimensions = () => {
//       if (containerRef.current) {
//         const { width, height } = containerRef.current.getBoundingClientRect();
//         if (width > 0 && height > 0) {
//           // Responsive height adjustment
//           const headerStatsHeight = window.innerWidth < 640 ? 180 : 140;
//           setChartDimensions({ width, height: Math.max(height - headerStatsHeight, 250) });
//           setIsReady(true);
//         }
//       }
//     };

//     // Initial measurement
//     measureDimensions();

//     // Debounced resize handler
//     let timeoutId;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(measureDimensions, 100);
//     };

//     const resizeObserver = new ResizeObserver((entries) => {
//       for (let entry of entries) {
//         const { width, height } = entry.contentRect;
//         if (width > 0 && height > 0) {
//           const headerStatsHeight = window.innerWidth < 640 ? 180 : 140;
//           setChartDimensions({ width, height: Math.max(height - headerStatsHeight, 250) });
//           setIsReady(true);
//         }
//       }
//     });

//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }

//     window.addEventListener('resize', handleResize);

//     return () => {
//       clearTimeout(timeoutId);
//       window.removeEventListener('resize', handleResize);
//       resizeObserver.disconnect();
//     };
//   }, []);

//   return (
//     <div 
//       ref={containerRef}
//       className={`
//         p-3 sm:p-4 rounded-xl shadow-sm border h-full w-full
//         ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
//       `}
//       style={{ 
//         minHeight: window?.innerWidth < 640 ? '450px' : '500px',
//         display: 'flex',
//         flexDirection: 'column'
//       }}
//     >
//       <h2 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-4 flex-shrink-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//         Department Performance
//       </h2>
      
//       {/* Chart container - takes remaining height */}
//       <div className="flex-grow w-full" style={{ minHeight: 1 }}>
//         {isReady && chartDimensions.width > 0 && chartDimensions.height > 0 ? (
//           <PerformanceRadarChart 
//             data={processedData} 
//             darkMode={darkMode}
//             width={chartDimensions.width}
//             height={chartDimensions.height}
//           />
//         ) : (
//           <div className="h-full w-full flex items-center justify-center">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 sm:h-10 w-8 sm:w-10 border-b-2 border-blue-500 mx-auto mb-2 sm:mb-3"></div>
//               <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                 Loading chart...
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Performance Summary - responsive grid */}
//       <div className="mt-2 sm:mt-4 grid grid-cols-3 gap-1 sm:gap-2 text-center flex-shrink-0">
//         <div className="p-1 sm:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
//           <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Attendance</p>
//           <p className={`text-sm sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {avgAttendance}%
//           </p>
//         </div>
//         <div className="p-1 sm:p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
//           <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Productivity</p>
//           <p className={`text-sm sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {avgProductivity}%
//           </p>
//         </div>
//         <div className="p-1 sm:p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
//           <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Satisfaction</p>
//           <p className={`text-sm sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//             {avgSatisfaction}%
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PerformanceChartContainer;


// containers/PerformanceChartContainer.js
import React, { useState, useEffect, useRef } from 'react';
import PerformanceRadarChart from '../../../charts/PerformanceRadarChart';
import { useTheme } from '../../../context/ThemeContext';

const PerformanceChartContainer = ({ 
  data = [],
  genderData = [],
  branchData = [],
  departmentData = [],
  designationData = []
}) => {
  const { darkMode } = useTheme();
  const [activeView, setActiveView] = useState('department'); // 'gender', 'branch', 'department', 'designation'
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);

  // Default data for each view
  const defaultData = {
    gender: [
      { category: 'Male', attendance: 92, productivity: 88, satisfaction: 85 },
      { category: 'Female', attendance: 94, productivity: 90, satisfaction: 92 },
      { category: 'Other', attendance: 88, productivity: 86, satisfaction: 90 }
    ],
    branch: [
      { category: 'Mumbai HQ', attendance: 95, productivity: 92, satisfaction: 88 },
      { category: 'Delhi NCR', attendance: 88, productivity: 90, satisfaction: 85 },
      { category: 'Bangalore', attendance: 92, productivity: 94, satisfaction: 90 },
      { category: 'Pune', attendance: 90, productivity: 88, satisfaction: 92 },
      { category: 'Chennai', attendance: 86, productivity: 85, satisfaction: 88 }
    ],
    department: [
      { category: 'Engineering', attendance: 95, productivity: 88, satisfaction: 92 },
      { category: 'Sales', attendance: 88, productivity: 92, satisfaction: 85 },
      { category: 'Marketing', attendance: 82, productivity: 85, satisfaction: 90 },
      { category: 'HR', attendance: 90, productivity: 78, satisfaction: 95 },
      { category: 'Finance', attendance: 92, productivity: 85, satisfaction: 80 }
    ],
    designation: [
      { category: 'Engineers', attendance: 92, productivity: 94, satisfaction: 88 },
      { category: 'Managers', attendance: 95, productivity: 92, satisfaction: 90 },
      { category: 'Executives', attendance: 88, productivity: 86, satisfaction: 92 },
      { category: 'Directors', attendance: 98, productivity: 96, satisfaction: 94 },
      { category: 'Staff', attendance: 90, productivity: 88, satisfaction: 89 }
    ]
  };

  // Get current data based on active view
  const getCurrentData = () => {
    switch(activeView) {
      case 'gender':
        return genderData.length > 0 ? genderData : defaultData.gender;
      case 'branch':
        return branchData.length > 0 ? branchData : defaultData.branch;
      case 'designation':
        return designationData.length > 0 ? designationData : defaultData.designation;
      case 'department':
      default:
        return departmentData.length > 0 ? departmentData : defaultData.department;
    }
  };

  // Calculate averages for current view
  const calculateAverages = () => {
    const currentData = getCurrentData();
    const total = currentData.length;
    
    if (total === 0) return { attendance: 0, productivity: 0, satisfaction: 0 };

    const sums = currentData.reduce((acc, item) => {
      acc.attendance += Number(item.attendance || 0);
      acc.productivity += Number(item.productivity || 0);
      acc.satisfaction += Number(item.satisfaction || 0);
      return acc;
    }, { attendance: 0, productivity: 0, satisfaction: 0 });

    return {
      attendance: Math.round(sums.attendance / total),
      productivity: Math.round(sums.productivity / total),
      satisfaction: Math.round(sums.satisfaction / total)
    };
  };

  const averages = calculateAverages();

  // Measure container with responsive adjustments
  useEffect(() => {
    const measureDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
          const headerStatsHeight = window.innerWidth < 640 ? 180 : 140;
          setChartDimensions({ width, height: Math.max(height - headerStatsHeight, 250) });
          setIsReady(true);
        }
      }
    };

    measureDimensions();

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(measureDimensions, 100);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const headerStatsHeight = window.innerWidth < 640 ? 180 : 140;
          setChartDimensions({ width, height: Math.max(height - headerStatsHeight, 250) });
          setIsReady(true);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  const viewOptions = [
    { id: 'gender', label: 'Gender Wise', icon: '👥', color: 'bg-purple-500' },
    { id: 'branch', label: 'Branch Wise', icon: '🏢', color: 'bg-orange-500' },
    { id: 'department', label: 'Dept Wise', icon: '📊', color: 'bg-blue-500' },
    { id: 'designation', label: 'Designation Wise', icon: '📋', color: 'bg-green-500' }
  ];

  return (
    <div 
      ref={containerRef}
      className={`
        p-3 sm:p-4 rounded-xl shadow-sm border h-full w-full
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}
      `}
      style={{ 
        minHeight: typeof window !== 'undefined' && window.innerWidth < 640 ? '500px' : '550px',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header with view selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 flex-shrink-0">
        <h2 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-0 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Performance Analytics
        </h2>
        
        {/* View selector buttons */}
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {viewOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setActiveView(option.id)}
              className={`
                px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg font-medium transition-all
                flex items-center gap-1
                ${activeView === option.id 
                  ? `${option.color} text-white shadow-md scale-105` 
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              <span>{option.icon}</span>
              <span className="hidden xs:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Chart container */}
      <div className="flex-grow w-full" style={{ minHeight: 1 }}>
        {isReady && chartDimensions.width > 0 && chartDimensions.height > 0 ? (
          <PerformanceRadarChart 
            data={getCurrentData()} 
            darkMode={darkMode}
            chartType={activeView}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 sm:h-10 w-8 sm:w-10 border-b-2 border-blue-500 mx-auto mb-2 sm:mb-3"></div>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Loading chart...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Performance Summary */}
      <div className="mt-2 sm:mt-4 flex-shrink-0">
        <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center mb-2">
          <div className="p-1 sm:p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Attendance</p>
            <p className={`text-sm sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {averages.attendance}%
            </p>
          </div>
          <div className="p-1 sm:p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
            <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Productivity</p>
            <p className={`text-sm sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {averages.productivity}%
            </p>
          </div>
          <div className="p-1 sm:p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
            <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>Satisfaction</p>
            <p className={`text-sm sm:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {averages.satisfaction}%
            </p>
          </div>
        </div>

        {/* Active view indicator */}
        <p className={`text-xs text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Showing {viewOptions.find(v => v.id === activeView)?.label} Performance Metrics
        </p>
      </div>
    </div>
  );
};

export default PerformanceChartContainer;