
import React, { useState, useMemo, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Brush
} from 'recharts';

const TrendComposedChart = ({ data, darkMode = false }) => {
  const [dimensions, setDimensions] = useState({ width: 0 });
  const [hiddenSeries, setHiddenSeries] = useState(new Set());
  const [zoomDomain, setZoomDomain] = useState(null);

  // Sample data if no data provided
  const sampleData = useMemo(() => [
    { month: 'Jan', attendance: 92, overtime: 45, late: 12, trend: 88 },
    { month: 'Feb', attendance: 88, overtime: 52, late: 18, trend: 85 },
    { month: 'Mar', attendance: 95, overtime: 38, late: 8, trend: 92 },
    { month: 'Apr', attendance: 86, overtime: 58, late: 22, trend: 82 },
    { month: 'May', attendance: 90, overtime: 42, late: 14, trend: 87 },
    { month: 'Jun', attendance: 93, overtime: 48, late: 10, trend: 90 },
    { month: 'Jul', attendance: 89, overtime: 55, late: 16, trend: 86 },
    { month: 'Aug', attendance: 91, overtime: 44, late: 13, trend: 89 },
    { month: 'Sep', attendance: 87, overtime: 56, late: 19, trend: 84 },
    { month: 'Oct', attendance: 94, overtime: 41, late: 9, trend: 91 },
    { month: 'Nov', attendance: 88, overtime: 53, late: 17, trend: 86 },
    { month: 'Dec', attendance: 90, overtime: 47, late: 15, trend: 88 }
  ], []);

  // Chart data
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return sampleData;
    }
    return data;
  }, [data, sampleData]);

  // Color palette for 3D effect
  const colors = useMemo(() => ({
    attendance: { 
      main: '#6366F1',
      gradient: ['#8183f3', '#4f51e5'],
      stroke: '#4f51e5'
    },
    overtime: { 
      main: '#F59E0B',
      gradient: ['#f7b044', '#e08c0b'],
      stroke: '#e08c0b'
    },
    late: { 
      main: '#EF4444',
      gradient: ['#f26767', '#dc2626'],
      stroke: '#dc2626'
    },
    trend: { 
      main: '#8B5CF6',
      gradient: ['#a27bf8', '#7b42f5'],
      stroke: '#7b42f5'
    }
  }), []);

  // Calculate statistics
  const stats = useMemo(() => {
    const metrics = ['attendance', 'overtime', 'late', 'trend'];
    const result = {};
    
    metrics.forEach(metric => {
      const values = chartData.map(d => d[metric]).filter(v => !isNaN(v));
      result[metric] = {
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        max: Math.max(...values),
        min: Math.min(...values),
        total: values.reduce((a, b) => a + b, 0)
      };
    });
    
    return result;
  }, [chartData]);

  // Toggle series visibility
  const toggleSeries = (series) => {
    const newHidden = new Set(hiddenSeries);
    if (newHidden.has(series)) {
      newHidden.delete(series);
    } else {
      newHidden.add(series);
    }
    setHiddenSeries(newHidden);
  };

  // Responsive settings
  const getChartSettings = () => {
    if (dimensions.width < 640) {
      return {
        fontSize: 10,
        margin: { top: 10, right: 10, left: 0, bottom: 30 },
        dotSize: false,
        strokeWidth: 2
      };
    } else if (dimensions.width < 1024) {
      return {
        fontSize: 11,
        margin: { top: 20, right: 20, left: 0, bottom: 30 },
        dotSize: true,
        strokeWidth: 2
      };
    } else {
      return {
        fontSize: 12,
        margin: { top: 20, right: 30, left: 0, bottom: 30 },
        dotSize: true,
        strokeWidth: 3
      };
    }
  };

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = getChartSettings();

  // Custom tooltip with 3D effect
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className={`
        p-2 sm:p-3 rounded-xl shadow-2xl border-2 min-w-[160px] sm:min-w-[200px]
        transform transition-all duration-200 hover:scale-105
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <p className={`font-bold text-sm sm:text-base mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-sm transform rotate-45 shadow-lg"
                style={{ backgroundColor: entry.color }}
              />
              <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {entry.name}:
              </span>
            </div>
            <span className="font-bold text-sm sm:text-base" style={{ color: entry.color }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Custom legend with 3D effect
  const renderLegend = () => {
    const series = [
      { key: 'attendance', name: 'Attendance', color: colors.attendance.main },
      { key: 'overtime', name: 'Overtime', color: colors.overtime.main },
      { key: 'late', name: 'Late', color: colors.late.main },
      { key: 'trend', name: 'Trend', color: colors.trend.main }
    ];

    return (
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2 py-3">
        {series.map((item) => (
          <button
            key={item.key}
            onClick={() => toggleSeries(item.key)}
            className={`
              flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 
              rounded-lg transition-all duration-300
              ${hiddenSeries.has(item.key) 
                ? 'opacity-40 grayscale' 
                : 'hover:scale-105 hover:shadow-lg'
              }
              ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}
            `}
            style={{
              borderLeft: `4px solid ${item.color}`,
              boxShadow: hiddenSeries.has(item.key) 
                ? 'none' 
                : darkMode 
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div 
              className="w-2 h-2 sm:w-3 sm:h-3 transform rotate-45"
              style={{ backgroundColor: item.color }}
            />
            <span className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {item.name}
            </span>
            <span className={`text-xs font-bold ml-1 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              ({Math.round(stats[item.key]?.avg || 0)})
            </span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
     

      {/* Main Chart */}
     <div className="w-full h-[350px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={settings.margin}
            onMouseLeave={() => setZoomDomain(null)}
          >
            <defs>
              {/* 3D Gradient Definitions */}
              {Object.entries(colors).map(([key, color]) => (
                <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color.gradient[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color.gradient[1]} stopOpacity={0.2}/>
                </linearGradient>
              ))}
              
              {/* Pattern for 3D effect */}
              <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" 
                  stroke="rgba(255,255,255,0.2)" 
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={darkMode ? '#374151' : '#E5E7EB'}
              opacity={0.5}
            />
            
            <XAxis 
              dataKey="month" 
              tick={{ fill: darkMode ? '#9CA3AF' : '#4B5563', fontSize: settings.fontSize }}
              axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
              tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
              interval={dimensions.width < 640 ? 1 : 0}
            />
            
            <YAxis 
              tick={{ fill: darkMode ? '#9CA3AF' : '#4B5563', fontSize: settings.fontSize }}
              axisLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
              tickLine={{ stroke: darkMode ? '#4B5563' : '#9CA3AF' }}
              domain={[0, 'auto']}
            />
            
            <Tooltip content={CustomTooltip} />
            
            {/* 3D Areas with stacking effect */}
            {!hiddenSeries.has('attendance') && (
              <Area
                type="monotone"
                dataKey="attendance"
                name="Attendance"
                stroke={colors.attendance.stroke}
                strokeWidth={settings.strokeWidth}
                fill={`url(#gradient-attendance)`}
                fillOpacity={0.8}
                dot={settings.dotSize}
                activeDot={{ r: 6, stroke: darkMode ? '#1F2937' : 'white', strokeWidth: 2 }}
                stackId="1"
              />
            )}
            
            {!hiddenSeries.has('overtime') && (
              <Area
                type="monotone"
                dataKey="overtime"
                name="Overtime"
                stroke={colors.overtime.stroke}
                strokeWidth={settings.strokeWidth}
                fill={`url(#gradient-overtime)`}
                fillOpacity={0.8}
                dot={settings.dotSize}
                activeDot={{ r: 6, stroke: darkMode ? '#1F2937' : 'white', strokeWidth: 2 }}
                stackId="2"
              />
            )}
            
            {!hiddenSeries.has('late') && (
              <Area
                type="monotone"
                dataKey="late"
                name="Late"
                stroke={colors.late.stroke}
                strokeWidth={settings.strokeWidth}
                fill={`url(#gradient-late)`}
                fillOpacity={0.8}
                dot={settings.dotSize}
                activeDot={{ r: 6, stroke: darkMode ? '#1F2937' : 'white', strokeWidth: 2 }}
                stackId="3"
              />
            )}
            
            {!hiddenSeries.has('trend') && (
              <Area
                type="monotone"
                dataKey="trend"
                name="Trend"
                stroke={colors.trend.stroke}
                strokeWidth={settings.strokeWidth + 1}
                fill={`url(#gradient-trend)`}
                fillOpacity={0.6}
                dot={settings.dotSize}
                activeDot={{ r: 6, stroke: darkMode ? '#1F2937' : 'white', strokeWidth: 2 }}
                strokeDasharray="5 5"
              />
            )}

            {/* Reference lines for averages */}
            {!hiddenSeries.has('attendance') && (
              <ReferenceLine 
                y={stats.attendance.avg} 
                stroke={colors.attendance.main}
                strokeDasharray="3 3"
                strokeWidth={1.5}
                label={{ 
                  value: 'Avg', 
                  position: 'right',
                  fill: colors.attendance.main,
                  fontSize: settings.fontSize
                }}
              />
            )}

            {/* Brush for zooming */}
            {dimensions.width > 768 && (
              <Brush
                dataKey="month"
                height={30}
                stroke={darkMode ? '#4B5563' : '#9CA3AF'}
                fill={darkMode ? '#1F2937' : '#F3F4F6'}
                travellerWidth={10}
                gap={5}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
    

      {/* Legend */}
      {renderLegend()}

   </div>
    </div>
  );
};

export default TrendComposedChart;