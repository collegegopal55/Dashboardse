

// import React, { useState, useEffect } from 'react';
// import { Clock, MoreVertical, Fingerprint, Smartphone, UserCheck, LogIn, LogOut } from 'lucide-react';

// const RecentPunchesCard = ({ punches = [], darkMode = false }) => {
//   const [blinkingDevices, setBlinkingDevices] = useState({});

//   // Effect to handle blinking for new punches
//   useEffect(() => {
//     // Jab bhi naye punches aate hain, unke devices ko blink karna shuru karo
//     const newBlinkingState = {};
//     const now = Date.now();
    
//     punches.forEach(punch => {
//       // Agar punch last 30 seconds mein hua hai toh blink karo
//       if (punch.timestamp && (now - punch.timestamp < 30000)) {
//         newBlinkingState[punch.device] = true;
//       }
//     });
    
//     setBlinkingDevices(newBlinkingState);

//     // 30 seconds ke baad blink band kar do
//     const timer = setTimeout(() => {
//       setBlinkingDevices({});
//     }, 30000);

//     return () => clearTimeout(timer);
//   }, [punches]);

//   const getPunchTypeIcon = (type) => {
//     switch(type?.toLowerCase()) {
//       case 'biometric':
//         return <Fingerprint className="w-4 h-4" />;
//       case 'mobile':
//         return <Smartphone className="w-4 h-4" />;
//       case 'manual':
//         return <UserCheck className="w-4 h-4" />;
//       default:
//         return <Clock className="w-4 h-4" />;
//     }
//   };

//   const getPunchStatusIcon = (status) => {
//     switch(status?.toLowerCase()) {
//       case 'in':
//         return <LogIn className="w-3.5 h-3.5 text-green-500" />;
//       case 'out':
//         return <LogOut className="w-3.5 h-3.5 text-red-500" />;
//       default:
//         return null;
//     }
//   };

//   const getDeviceColor = (device) => {
//     switch(device) {
//       case 'Main Gate':
//         return 'bg-purple-500';
//       case 'Side Gate':
//         return 'bg-orange-500';
//       case 'Office Entry':
//         return 'bg-indigo-500';
//       case 'Mobile App':
//         return 'bg-emerald-500';
//       default:
//         return 'bg-gray-500';
//     }
//   };

//   const formatTime = (time) => {
//     if (!time) return '--:--';
//     return time;
//   };

//   // Check if device should blink
//   const shouldBlink = (device) => {
//     return blinkingDevices[device] ? 'animate-pulse' : '';
//   };

//   return (
//     <div className={`p-4 sm:p-6 rounded-xl shadow-sm border ${
//       darkMode 
//         ? 'bg-gray-800 border-gray-700' 
//         : 'bg-white border-gray-100'
//     }`}>
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className={`text-base sm:text-lg font-semibold ${
//           darkMode ? 'text-white' : 'text-gray-900'
//         }`}>
//           Recent Punches
//         </h2>
//         <div className="flex items-center space-x-2">
//           {/* Live indicator with blinking dot */}
//           <span className="flex items-center space-x-1">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//             </span>
//             <span className={`text-xs ${
//               darkMode ? 'text-gray-300' : 'text-gray-500'
//             }`}>
//               Live
//             </span>
//           </span>
//           <span className={`text-xs px-2 py-1 rounded ${
//             darkMode 
//               ? 'text-gray-300 bg-gray-700' 
//               : 'text-gray-500 bg-gray-100'
//           }`}>
//             {punches.length} updates
//           </span>
//         </div>
//       </div>
      
//       {/* Punches List */}
//       <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
//         {punches.length > 0 ? (
//           punches.map((punch, index) => (
//             <div 
//               key={punch.id || index} 
//               className={`flex items-start justify-between p-3 rounded-lg transition-colors ${
//                 darkMode 
//                   ? 'bg-gray-700/50 hover:bg-gray-700' 
//                   : 'bg-gray-50 hover:bg-gray-100'
//               }`}
//             >
//               {/* Main Content - Left Side */}
//               <div className="flex-1 min-w-0">
//                 {/* Employee Name and ID */}
//                 <div className="flex items-center flex-wrap gap-2 mb-1">
//                   <span className={`text-sm font-medium truncate ${
//                     darkMode ? 'text-white' : 'text-gray-900'
//                   }`}>
//                     {punch.employeeName || punch.name || 'Unknown'}
//                   </span>
//                   <span className={`text-xs px-2 py-0.5 rounded-full ${
//                     darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
//                   }`}>
//                     {punch.employeeId || punch.empCode || 'N/A'}
//                   </span>
//                 </div>

//                 {/* Device and Punch Type */}
//                 <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-1">
//                   {/* Device Badge with Blink Effect */}
//                   <div className={`flex items-center space-x-1 ${shouldBlink(punch.device)}`}>
//                     <div className={`w-2 h-2 rounded-full ${getDeviceColor(punch.device)}`} />
//                     <span className={`text-xs ${
//                       darkMode ? 'text-gray-400' : 'text-gray-500'
//                     }`}>
//                       {punch.device || 'Unknown Device'}
//                     </span>
//                   </div>

//                   {/* Punch Type */}
//                   <div className={`flex items-center space-x-1 text-xs px-1.5 py-0.5 rounded ${
//                     darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
//                   }`}>
//                     {getPunchTypeIcon(punch.type)}
//                     <span className="capitalize">{punch.type || 'unknown'}</span>
//                   </div>

//                   {/* In/Out Status */}
//                   {punch.status && (
//                     <div className={`flex items-center space-x-1 text-xs ${
//                       punch.status.toLowerCase() === 'in' 
//                         ? 'text-green-500' 
//                         : punch.status.toLowerCase() === 'out' 
//                         ? 'text-red-500' 
//                         : darkMode ? 'text-gray-400' : 'text-gray-500'
//                     }`}>
//                       {getPunchStatusIcon(punch.status)}
//                       <span className="capitalize">{punch.status}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Department */}
//                 {punch.department && (
//                   <div className={`text-xs ${
//                     darkMode ? 'text-gray-500' : 'text-gray-400'
//                   }`}>
//                     {punch.department}
//                   </div>
//                 )}
//               </div>

//               {/* Time and Action - Right Side */}
//               <div className="flex items-center space-x-3 ml-4">
//                 {/* Time */}
//                 <div className="text-right">
//                   <div className={`text-sm font-medium ${
//                     darkMode ? 'text-white' : 'text-gray-900'
//                   }`}>
//                     {formatTime(punch.time)}
//                   </div>
//                   <div className={`text-xs ${
//                     darkMode ? 'text-gray-500' : 'text-gray-400'
//                   }`}>
//                     {punch.date || ''}
//                   </div>
//                 </div>

              
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className={`text-center py-8 ${
//             darkMode ? 'text-gray-400' : 'text-gray-500'
//           }`}>
//             No recent punches available
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecentPunchesCard;

import React, { useState, useEffect } from 'react';
import { Clock, MoreVertical, Fingerprint, Smartphone, UserCheck, LogIn, LogOut } from 'lucide-react';

const RecentPunchesCard = ({ punches = [], darkMode = false }) => {
  const [blinkingDevices, setBlinkingDevices] = useState({});

  // Effect to handle blinking for new punches
  useEffect(() => {
    // Sirf biometric punches ke liye blink karo
    const newBlinkingState = {};
    const now = Date.now();
    
    punches.forEach(punch => {
      // Sirf biometric punches ke liye device blink karo
      if (punch.type?.toLowerCase() === 'biometric' && 
          punch.timestamp && 
          (now - punch.timestamp < 30000)) {
        newBlinkingState[punch.device] = true;
      }
    });
    
    setBlinkingDevices(newBlinkingState);

    // 30 seconds ke baad blink band kar do
    const timer = setTimeout(() => {
      setBlinkingDevices({});
    }, 30000);

    return () => clearTimeout(timer);
  }, [punches]);

  const getPunchTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'biometric':
        return <Fingerprint className="w-4 h-4" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'manual':
        return <UserCheck className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPunchStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'in':
        return <LogIn className="w-3.5 h-3.5 text-green-500" />;
      case 'out':
        return <LogOut className="w-3.5 h-3.5 text-red-500" />;
      default:
        return null;
    }
  };

  const getDeviceColor = (device) => {
    switch(device) {
      case 'Main Gate':
        return 'bg-purple-500';
      case 'Side Gate':
        return 'bg-orange-500';
      case 'Office Entry':
        return 'bg-indigo-500';
      case 'Mobile App':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTime = (time) => {
    if (!time) return '--:--';
    return time;
  };

  // Check if device should blink (sirf biometric punches ke liye)
  const shouldBlink = (punch) => {
    return punch.type?.toLowerCase() === 'biometric' && blinkingDevices[punch.device] ? 'animate-pulse' : '';
  };

  // Check if device should be shown (sirf biometric punches mein)
  const shouldShowDevice = (punch) => {
    return punch.type?.toLowerCase() === 'biometric';
  };

  return (
    <div className={`p-4 sm:p-6 rounded-xl shadow-sm border ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-100'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-base sm:text-lg font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Recent Punches
        </h2>
        <div className="flex items-center space-x-2">
          {/* Live indicator with blinking dot */}
          <span className="flex items-center space-x-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className={`text-xs ${
              darkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Live
            </span>
          </span>
          <span className={`text-xs px-2 py-1 rounded ${
            darkMode 
              ? 'text-gray-300 bg-gray-700' 
              : 'text-gray-500 bg-gray-100'
          }`}>
            {punches.length} updates
          </span>
        </div>
      </div>
      
      {/* Punches List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        {punches.length > 0 ? (
          punches.map((punch, index) => (
            <div 
              key={punch.id || index} 
              className={`flex items-start justify-between p-3 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700/50 hover:bg-gray-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {/* Main Content - Left Side */}
              <div className="flex-1 min-w-0">
                {/* Employee Name and ID */}
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <span className={`text-sm font-medium truncate ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {punch.employeeName || punch.name || 'Unknown'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {punch.employeeId || punch.empCode || 'N/A'}
                  </span>
                </div>

                {/* Device and Punch Type */}
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-1">
                  {/* Device Badge - SIRF BIOMETRIC PUNCHES KE LIYE DIKHEGA */}
                  {shouldShowDevice(punch) && (
                    <div className={`flex items-center space-x-1 ${shouldBlink(punch)}`}>
                      <div className={`w-2 h-2 rounded-full ${getDeviceColor(punch.device)}`} />
                      <span className={`text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {punch.device || 'Unknown Device'}
                      </span>
                    </div>
                  )}

                  {/* Punch Type - ALWAYS SHOW */}
                  <div className={`flex items-center space-x-1 text-xs px-1.5 py-0.5 rounded ${
                    darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getPunchTypeIcon(punch.type)}
                    <span className="capitalize">{punch.type || 'unknown'}</span>
                  </div>

                  {/* In/Out Status */}
                  {punch.status && (
                    <div className={`flex items-center space-x-1 text-xs ${
                      punch.status.toLowerCase() === 'in' 
                        ? 'text-green-500' 
                        : punch.status.toLowerCase() === 'out' 
                        ? 'text-red-500' 
                        : darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {getPunchStatusIcon(punch.status)}
                      <span className="capitalize">{punch.status}</span>
                    </div>
                  )}
                </div>

                {/* Department */}
                {punch.department && (
                  <div className={`text-xs ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {punch.department}
                  </div>
                )}
              </div>

              {/* Time and Action - Right Side */}
              <div className="flex items-center space-x-3 ml-4">
                {/* Time */}
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formatTime(punch.time)}
                  </div>
                  <div className={`text-xs ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {punch.date || ''}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={`text-center py-8 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            No recent punches available
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPunchesCard;