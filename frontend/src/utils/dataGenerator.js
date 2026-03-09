// import { 
//   DEPARTMENTS,
//   DESIGNATIONS,
//   ATTENDANCE_TYPES,
//   EMPLOYEE_STATUS,
//   MONTHS,
//   LEAVE_TYPES,
//   SHIFT_TIMINGS
// } from '../constants';

// // Helper function to generate random date
// const randomDate = (start, end) => {
//   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// };

// // Generate random phone number
// const generatePhoneNumber = () => {
//   const prefixes = ['987', '876', '765', '654', '543', '432', '321', '998', '887', '776'];
//   const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
//   const number = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
//   return `+91 ${prefix}${number}`;
// };

// // Generate random email
// const generateEmail = (firstName, lastName) => {
//   const domains = ['company.com', 'organization.org', 'business.net', 'corp.in'];
//   const domain = domains[Math.floor(Math.random() * domains.length)];
//   return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
// };

// // Generate random employee ID
// const generateEmployeeId = (index) => {
//   const year = new Date().getFullYear();
//   return `EMP${year}${index.toString().padStart(4, '0')}`;
// };

// // First names for random generation
// const FIRST_NAMES = [
//   'Aarav', 'Vihaan', 'Vivaan', 'Ananya', 'Diya', 'Advik', 'Kabir', 'Arjun',
//   'Sai', 'Ishaan', 'Aadhya', 'Anaya', 'Sara', 'Reyansh', 'Ayaan', 'Krishna',
//   'Rohan', 'Priya', 'Amit', 'Neha', 'Raj', 'Pooja', 'Vikram', 'Sunita',
//   'Deepak', 'Kavita', 'Sanjay', 'Meera', 'Alok', 'Shweta', 'Prakash', 'Anjali'
// ];

// // Last names for random generation
// const LAST_NAMES = [
//   'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Joshi', 'Reddy',
//   'Rao', 'Nair', 'Menon', 'Iyer', 'Desai', 'Mehta', 'Shah', 'Malhotra',
//   'Chopra', 'Khanna', 'Kapoor', 'Saxena', 'Trivedi', 'Bhatt', 'Mishra', 'Dubey'
// ];

// // Generate employees
// export const generateEmployees = (count = 100) => {
//   const employees = [];
//   const startDate = new Date(2020, 0, 1);
//   const endDate = new Date();

//   for (let i = 0; i < count; i++) {
//     const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
//     const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
//     const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
//     const designation = DESIGNATIONS[Math.floor(Math.random() * DESIGNATIONS.length)];
//     const joiningDate = randomDate(startDate, endDate);
//     const status = EMPLOYEE_STATUS.ACTIVE; // Most employees active
    
//     employees.push({
//       id: generateEmployeeId(i + 1),
//       employeeId: generateEmployeeId(i + 1),
//       firstName,
//       lastName,
//       name: `${firstName} ${lastName}`,
//       email: generateEmail(firstName, lastName),
//       phone: generatePhoneNumber(),
//       department,
//       designation,
//       joiningDate: joiningDate.toISOString().split('T')[0],
//       status,
//       shift: Object.keys(SHIFT_TIMINGS)[Math.floor(Math.random() * Object.keys(SHIFT_TIMINGS).length)],
//       manager: `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`,
//       location: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad'][Math.floor(Math.random() * 6)],
//       bloodGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'][Math.floor(Math.random() * 8)],
//       emergencyContact: generatePhoneNumber(),
//       profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
//     });
//   }

//   return employees;
// };

// // Generate attendance data for a specific employee
// export const generateEmployeeAttendance = (employeeId, month, year) => {
//   const attendance = [];
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
  
//   for (let day = 1; day <= daysInMonth; day++) {
//     const date = new Date(year, month, day);
//     const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
//     let status;
//     let punchIn, punchOut;
    
//     if (isWeekend) {
//       status = ATTENDANCE_TYPES.WEEKLY_OFF;
//     } else {
//       const rand = Math.random();
//       if (rand < 0.7) {
//         status = ATTENDANCE_TYPES.PRESENT;
//         punchIn = '09:00';
//         punchOut = '18:00';
//       } else if (rand < 0.85) {
//         status = ATTENDANCE_TYPES.LATE;
//         punchIn = '09:30';
//         punchOut = '18:30';
//       } else if (rand < 0.95) {
//         status = ATTENDANCE_TYPES.LEAVE;
//       } else {
//         status = ATTENDANCE_TYPES.ABSENT;
//       }
//     }
    
//     attendance.push({
//       date: date.toISOString().split('T')[0],
//       employeeId,
//       status,
//       punchIn,
//       punchOut,
//       workingHours: punchIn && punchOut ? '9h 0m' : '0h 0m',
//       overtime: '0h 0m'
//     });
//   }
  
//   return attendance;
// };

// // export const generateRecentPunches = (employees, count = 20) => {
// //   const punches = [];
// //   const now = new Date();
  
// //   // Active employees hi len
// //   const activeEmployees = employees.filter(e => e.status === EMPLOYEE_STATUS.ACTIVE);
  
// //   for (let i = 0; i < count; i++) {
// //     const employee = activeEmployees[Math.floor(Math.random() * activeEmployees.length)];
// //     if (!employee) continue;
    
// //     const punchTime = new Date(now - Math.random() * 3600000 * 8); // Last 8 hours
// //     const punchTypes = ['biometric', 'mobile', 'manual'];
// //     const devices = ['Main Gate', 'Side Gate', 'Office Entry'];
// //     const punchStatus = ['in', 'out'][Math.floor(Math.random() * 2)]; // Random in/out
    
// //     // Format time properly
// //     const hours = punchTime.getHours().toString().padStart(2, '0');
// //     const minutes = punchTime.getMinutes().toString().padStart(2, '0');
// //     const formattedTime = `${hours}:${minutes}`;
    
// //     // Format date
// //     const date = punchTime.toISOString().split('T')[0];
    
// //     punches.push({
// //       id: `punch-${employee.id}-${punchTime.getTime()}-${Math.random().toString(36).substr(2, 5)}`,
// //       employeeId: employee.employeeId || employee.id,
// //       employeeName: employee.name,
// //       name: employee.name, // For backward compatibility
// //       empCode: employee.employeeId || employee.id, // For backward compatibility
// //       department: employee.department,
// //       type: punchTypes[Math.floor(Math.random() * punchTypes.length)],
// //       device: devices[Math.floor(Math.random() * devices.length)],
// //       status: punchStatus, // 'in' or 'out'
// //       time: formattedTime,
// //       date: date,
// //       timestamp: punchTime.getTime(),
// //       punchIn: punchStatus === 'in' ? formattedTime : null,
// //       punchOut: punchStatus === 'out' ? formattedTime : null,
// //     });
// //   }
  
// //   // Sort by timestamp (newest first)
// //   return punches.sort((a, b) => b.timestamp - a.timestamp);
// // };



// export const generateRecentPunches = (employees, count = 20) => {
//   const punches = [];
//   const now = new Date();
  
//   const activeEmployees = employees.filter(e => e.status === EMPLOYEE_STATUS.ACTIVE);
  
//   for (let i = 0; i < count; i++) {
//     const employee = activeEmployees[Math.floor(Math.random() * activeEmployees.length)];
//     if (!employee) continue;
    
//     const punchTime = new Date(now - Math.random() * 3600000 * 8);
//     const punchTypes = ['biometric', 'mobile', 'manual'];
//     const devices = ['Main Gate', 'Side Gate', 'Office Entry'];
//     const punchStatus = ['in', 'out'][Math.floor(Math.random() * 2)];
    
//     const type = punchTypes[Math.floor(Math.random() * punchTypes.length)];
//     const device = devices[Math.floor(Math.random() * devices.length)];
    
//     const hours = punchTime.getHours().toString().padStart(2, '0');
//     const minutes = punchTime.getMinutes().toString().padStart(2, '0');
//     const formattedTime = `${hours}:${minutes}`;
//     const date = punchTime.toISOString().split('T')[0];
    
//     punches.push({
//       id: `punch-${employee.id}-${punchTime.getTime()}-${Math.random().toString(36).substr(2, 5)}`,
//       employeeId: employee.employeeId || employee.id,
//       employeeName: employee.name,
//       name: employee.name,
//       empCode: employee.employeeId || employee.id,
//       department: employee.department,
//       type: type,
//       // SIRF BIOMETRIC punches ke liye device assign karo, warna null
//       device: type === 'biometric' ? device : null,
//       status: punchStatus,
//       time: formattedTime,
//       date: date,
//       timestamp: punchTime.getTime(),
//       punchIn: punchStatus === 'in' ? formattedTime : null,
//       punchOut: punchStatus === 'out' ? formattedTime : null,
//     });
//   }
  
//   return punches.sort((a, b) => b.timestamp - a.timestamp);
// };


// // Generate birthdays for current month
// // export const generateBirthdays = (employees) => {
// //   const currentMonth = new Date().getMonth();
  
// //   return employees
// //     .filter(emp => {
// //       const joiningDate = new Date(emp.joiningDate);
// //       return joiningDate.getMonth() === currentMonth;
// //     })
// //     .slice(0, 20)
// //     .map(emp => ({
// //       id: emp.id,
// //       name: emp.name,
// //       department: emp.department,
// //       date: new Date(emp.joiningDate).getDate(),
// //       type: 'birthday'
// //     }));
// // };
// export const generateBirthdays = (employees) => {
//   const today = new Date();
//   const currentMonth = today.getMonth();
//   const currentDate = today.getDate();
  
//   return employees
//     .map(emp => {
//       // Generate a random birth date (assuming birth year doesn't matter)
//       // You can modify this logic based on your actual data structure
//       const birthMonth = Math.floor(Math.random() * 12); // Random month 0-11
//       const birthDate = Math.floor(Math.random() * 28) + 1; // Random date 1-28
      
//       // Create birth date for current year
//       const birthThisYear = new Date(today.getFullYear(), birthMonth, birthDate);
      
//       // If birthday already passed, use next year's date for sorting
//       const eventDate = birthThisYear < today 
//         ? new Date(today.getFullYear() + 1, birthMonth, birthDate)
//         : birthThisYear;
      
//       // Calculate days until birthday
//       const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
      
//       return {
//         id: emp.id,
//         name: emp.name,
//         empCode: emp.employeeId || emp.id,
//         department: emp.department,
//         date: birthThisYear.toISOString().split('T')[0], // Store as ISO string
//         birthDate: birthDate,
//         birthMonth: birthMonth,
//         isToday: birthDate === currentDate && birthMonth === currentMonth,
//         daysUntil: daysUntil,
//         eventDate: eventDate,
//         fullDate: eventDate.toLocaleDateString('en-US', { 
//           weekday: 'short', 
//           year: 'numeric', 
//           month: 'short', 
//           day: 'numeric' 
//         }),
//         type: 'birthday'
//       };
//     })
//     .filter(bday => bday.daysUntil <= 30) // Show next 30 days birthdays
//     .sort((a, b) => a.daysUntil - b.daysUntil); // Sort by nearest first
// };
// // Generate anniversaries for current month
// // export const generateAnniversaries = (employees) => {
// //   const currentMonth = new Date().getMonth();
  
// //   return employees
// //     .filter(emp => {
// //       const joiningDate = new Date(emp.joiningDate);
// //       return joiningDate.getMonth() === currentMonth;
// //     })
// //     .slice(0, 19)
// //     .map(emp => ({
// //       id: emp.id,
// //       name: emp.name,
// //       department: emp.department,
// //       date: new Date(emp.joiningDate).getDate(),
// //       year: new Date().getFullYear() - new Date(emp.joiningDate).getFullYear(),
// //       type: 'anniversary'
// //     }));
// // };


// // Generate anniversaries - Keep based on joining date (this is correct)
// export const generateAnniversaries = (employees) => {
//   const today = new Date();
//   const currentMonth = today.getMonth();
//   const currentDate = today.getDate();
  
//   return employees
//     .map(emp => {
//       const joiningDate = new Date(emp.joiningDate);
//       const joiningMonth = joiningDate.getMonth();
//       const joiningDay = joiningDate.getDate();
      
//       // Calculate anniversary for this year
//       const anniThisYear = new Date(today.getFullYear(), joiningMonth, joiningDay);
      
//       // If anniversary already passed, use next year's date
//       const eventDate = anniThisYear < today
//         ? new Date(today.getFullYear() + 1, joiningMonth, joiningDay)
//         : anniThisYear;
      
//       // Calculate years of service
//       const years = today.getFullYear() - joiningDate.getFullYear();
      
//       // Calculate days until anniversary
//       const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
      
//       return {
//         id: emp.id,
//         name: emp.name,
//         empCode: emp.employeeId || emp.id,
//         department: emp.department,
//         date: anniThisYear.toISOString().split('T')[0],
//         isToday: joiningDay === currentDate && joiningMonth === currentMonth,
//         years: years,
//         daysUntil: daysUntil,
//         eventDate: eventDate,
//         fullDate: eventDate.toLocaleDateString('en-US', { 
//           weekday: 'short', 
//           year: 'numeric', 
//           month: 'short', 
//           day: 'numeric' 
//         }),
//         type: 'anniversary'
//       };
//     })
//     .filter(anni => anni.daysUntil <= 30) // Show next 30 days anniversaries
//     .sort((a, b) => a.daysUntil - b.daysUntil); // Sort by nearest first
// };

// // Generate leave requests
// export const generateLeaveRequests = (employees, count = 20) => {
//   const leaveRequests = [];
//   const leaveTypes = Object.values(LEAVE_TYPES);
  
//   for (let i = 0; i < count; i++) {
//     const employee = employees[Math.floor(Math.random() * employees.length)];
//     const startDate = new Date();
//     startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10));
//     const endDate = new Date(startDate);
//     endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 3) + 1);
    
//     leaveRequests.push({
//       id: `leave_${i}`,
//       employeeId: employee.id,
//       employeeName: employee.name,
//       department: employee.department,
//       type: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
//       startDate: startDate.toISOString().split('T')[0],
//       endDate: endDate.toISOString().split('T')[0],
//       days: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)),
//       reason: ['Personal', 'Sick', 'Family Function', 'Travel'][Math.floor(Math.random() * 4)],
//       status: ['Pending', 'Approved', 'Rejected'][Math.floor(Math.random() * 3)]
//     });
//   }
  
//   return leaveRequests;
// };

// // Generate department-wise data for charts
// export const generateDepartmentData = (employees) => {
//   const deptMap = new Map();
  
//   employees.forEach(emp => {
//     const count = deptMap.get(emp.department) || 0;
//     deptMap.set(emp.department, count + 1);
//   });
  
//   return Array.from(deptMap.entries()).map(([name, value]) => ({
//     name,
//     value
//   }));
// };

// //Generate trend data for charts
// export const generateTrendData = () => {
//   const data = [];
//   const months = MONTHS;
  
//   months.forEach(month => {
//     data.push({
//       month,
//       present: Math.floor(Math.random() * 300) + 200,
//       absent: Math.floor(Math.random() * 50) + 10,
//       late: Math.floor(Math.random() * 40) + 10,
//       leave: Math.floor(Math.random() * 30) + 5
//     });
//   });
  
//   return data;
// };


// // export const generateTrendData= (days = 30) => {
// //   const trendData = [];
// //   const now = new Date();

// //   for (let i = days; i >= 0; i--) {
// //     const date = new Date(now);
// //     date.setDate(now.getDate() - i);
    
// //     const dateString = date.toISOString().split('T')[0];
// //     const isWeekend = date.getDay() === 0 || date.getDay() === 6;

// //     trendData.push({
// //       date: dateString,
// //       // Formatting date for chart labels (e.g., "05 Mar")
// //       label: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
// //       // Random mock counts
// //       present: isWeekend ? 0 : Math.floor(Math.random() * 50) + 150,
// //       absent: isWeekend ? 0 : Math.floor(Math.random() * 15) + 5,
// //       late: isWeekend ? 0 : Math.floor(Math.random() * 20) + 10,
// //       onLeave: isWeekend ? 0 : Math.floor(Math.random() * 10) + 2,
// //       holiday: isWeekend ? 1 : 0
// //     });
// //   }

// //   return trendData;
// // };


// // Generate last 7 days attendance data
// export const generateLast7DaysData = () => {
//   const data = [];
//   const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
//   days.forEach(day => {
//     data.push({
//       day,
//       present: Math.floor(Math.random() * 80) + 20,
//       absent: Math.floor(Math.random() * 20) + 5,
//       late: Math.floor(Math.random() * 15) + 5,
//       leave: Math.floor(Math.random() * 10) + 2
//     });
//   });
  
//   return data;
// };

// // Generate department performance data for radar chart
// export const generateDeptPerformance = () => {
//   const metrics = ['Attendance', 'Punctuality', 'Productivity', 'Quality', 'Teamwork', 'Initiative'];
//   const departments = DEPARTMENTS.slice(0, 5); // Use first 5 departments
  
//   return departments.map(dept => ({
//     department: dept,
//     ...metrics.reduce((acc, metric) => {
//       acc[metric] = Math.floor(Math.random() * 40) + 60; // Random between 60-100
//       return acc;
//     }, {})
//   }));
// };




// export const getTodayAttendance = (employees) => {
//   const today = new Date().toISOString().split('T')[0];
//   const dayOfWeek = new Date().getDay(); // 0 = Sunday, 6 = Saturday
//   const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
//   // If it's a weekend/holiday, return appropriate stats
//   if (isWeekend) {
//     return {
//       activeUsers: 0,
//       todayAttendance: {
//         onTime: 0,
//         late: 0,
//         absent: 0,
//         leave: 0,
//         tour: 0,
//         holiday: 0,
//         weeklyOff: employees.filter(e => e.status === 'ACTIVE').length
//       }
//     };
//   }

//   // For weekdays, generate realistic attendance
//   const activeEmployees = employees.filter(e => e.status === 'ACTIVE');
//   const totalActive = activeEmployees.length;
  
//   // Generate random but realistic distribution
//   const onTime = Math.floor(totalActive * 0.6); // 60% on time
//   const late = Math.floor(totalActive * 0.15); // 15% late
//   const absent = Math.floor(totalActive * 0.1); // 10% absent
//   const leave = Math.floor(totalActive * 0.08); // 8% on leave
//   const tour = Math.floor(totalActive * 0.05); // 5% on tour
//   const holiday = 0; // 0 unless it's a holiday
//   const weeklyOff = 0; // 0 on weekdays
  
//   // Adjust to make sure total doesn't exceed active employees
//   const total = onTime + late + absent + leave + tour;
//   const diff = totalActive - total;
  
//   // Add any remaining to onTime
//   const adjustedOnTime = onTime + diff;
  
//   return {
//     activeUsers: totalActive,
//     todayAttendance: {
//       onTime: adjustedOnTime,
//       late,
//       absent,
//       leave,
//       tour,
//       holiday,
//       weeklyOff
//     }
//   };
// };
// // Default export with all generators
// export default {
//   generateEmployees,
//   generateEmployeeAttendance,
//   generateRecentPunches,
//   generateBirthdays,
//   generateAnniversaries,
//   generateLeaveRequests,
//   generateDepartmentData,
//   generateTrendData,
//   generateLast7DaysData,
//   generateDeptPerformance,
//   getTodayAttendance
// };



// dataGenerators.js
import { 
  DEPARTMENTS,
  DESIGNATIONS,
  ATTENDANCE_TYPES,
  EMPLOYEE_STATUS,
  MONTHS,
  LEAVE_TYPES,
  SHIFT_TIMINGS,
  GENDERS,
  BRANCHES,
  GENDER_COLORS,
  BRANCH_COLORS,
  DEPARTMENT_COLORS
} from '../constants';

// Helper function to generate random date
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate random phone number
const generatePhoneNumber = () => {
  const prefixes = ['987', '876', '765', '654', '543', '432', '321', '998', '887', '776'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `+91 ${prefix}${number}`;
};

// Generate random email
const generateEmail = (firstName, lastName) => {
  const domains = ['company.com', 'organization.org', 'business.net', 'corp.in'];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
};

// Generate random employee ID
const generateEmployeeId = (index) => {
  const year = new Date().getFullYear();
  return `EMP${year}${index.toString().padStart(4, '0')}`;
};

// First names for random generation
const FIRST_NAMES = [
  'Aarav', 'Vihaan', 'Vivaan', 'Ananya', 'Diya', 'Advik', 'Kabir', 'Arjun',
  'Sai', 'Ishaan', 'Aadhya', 'Anaya', 'Sara', 'Reyansh', 'Ayaan', 'Krishna',
  'Rohan', 'Priya', 'Amit', 'Neha', 'Raj', 'Pooja', 'Vikram', 'Sunita',
  'Deepak', 'Kavita', 'Sanjay', 'Meera', 'Alok', 'Shweta', 'Prakash', 'Anjali'
];

// Last names for random generation
const LAST_NAMES = [
  'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Joshi', 'Reddy',
  'Rao', 'Nair', 'Menon', 'Iyer', 'Desai', 'Mehta', 'Shah', 'Malhotra',
  'Chopra', 'Khanna', 'Kapoor', 'Saxena', 'Trivedi', 'Bhatt', 'Mishra', 'Dubey'
];

// Generate employees
export const generateEmployees = (count = 100) => {
  const employees = [];
  const startDate = new Date(2020, 0, 1);
  const endDate = new Date();

  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
    const designation = DESIGNATIONS[Math.floor(Math.random() * DESIGNATIONS.length)];
    const joiningDate = randomDate(startDate, endDate);
    const status = EMPLOYEE_STATUS.ACTIVE;
    
    // Add gender and branch
    const gender = GENDERS[Math.floor(Math.random() * GENDERS.length)];
    const branch = BRANCHES[Math.floor(Math.random() * BRANCHES.length)];
    
    employees.push({
      id: generateEmployeeId(i + 1),
      employeeId: generateEmployeeId(i + 1),
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName),
      phone: generatePhoneNumber(),
      department,
      designation,
      joiningDate: joiningDate.toISOString().split('T')[0],
      status,
      shift: Object.keys(SHIFT_TIMINGS)[Math.floor(Math.random() * Object.keys(SHIFT_TIMINGS).length)],
      manager: `${FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]}`,
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Chennai', 'Hyderabad'][Math.floor(Math.random() * 6)],
      bloodGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'][Math.floor(Math.random() * 8)],
      emergencyContact: generatePhoneNumber(),
      profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      // New fields
      gender,
      branch
    });
  }

  return employees;
};

// Generate attendance data for a specific employee
export const generateEmployeeAttendance = (employeeId, month, year) => {
  const attendance = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    let status;
    let punchIn, punchOut;
    
    if (isWeekend) {
      status = ATTENDANCE_TYPES.WEEKLY_OFF;
    } else {
      const rand = Math.random();
      if (rand < 0.7) {
        status = ATTENDANCE_TYPES.PRESENT;
        punchIn = '09:00';
        punchOut = '18:00';
      } else if (rand < 0.85) {
        status = ATTENDANCE_TYPES.LATE;
        punchIn = '09:30';
        punchOut = '18:30';
      } else if (rand < 0.95) {
        status = ATTENDANCE_TYPES.LEAVE;
      } else {
        status = ATTENDANCE_TYPES.ABSENT;
      }
    }
    
    attendance.push({
      date: date.toISOString().split('T')[0],
      employeeId,
      status,
      punchIn,
      punchOut,
      workingHours: punchIn && punchOut ? '9h 0m' : '0h 0m',
      overtime: '0h 0m'
    });
  }
  
  return attendance;
};

export const generateRecentPunches = (employees, count = 20) => {
  const punches = [];
  const now = new Date();
  
  const activeEmployees = employees.filter(e => e.status === EMPLOYEE_STATUS.ACTIVE);
  
  for (let i = 0; i < count; i++) {
    const employee = activeEmployees[Math.floor(Math.random() * activeEmployees.length)];
    if (!employee) continue;
    
    const punchTime = new Date(now - Math.random() * 3600000 * 8);
    const punchTypes = ['biometric', 'mobile', 'manual'];
    const devices = ['Main Gate', 'Side Gate', 'Office Entry'];
    const punchStatus = ['in', 'out'][Math.floor(Math.random() * 2)];
    
    const type = punchTypes[Math.floor(Math.random() * punchTypes.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    
    const hours = punchTime.getHours().toString().padStart(2, '0');
    const minutes = punchTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    const date = punchTime.toISOString().split('T')[0];
    
    punches.push({
      id: `punch-${employee.id}-${punchTime.getTime()}-${Math.random().toString(36).substr(2, 5)}`,
      employeeId: employee.employeeId || employee.id,
      employeeName: employee.name,
      name: employee.name,
      empCode: employee.employeeId || employee.id,
      department: employee.department,
      type: type,
      device: type === 'biometric' ? device : null,
      status: punchStatus,
      time: formattedTime,
      date: date,
      timestamp: punchTime.getTime(),
      punchIn: punchStatus === 'in' ? formattedTime : null,
      punchOut: punchStatus === 'out' ? formattedTime : null,
    });
  }
  
  return punches.sort((a, b) => b.timestamp - a.timestamp);
};

// Generate birthdays for current month
export const generateBirthdays = (employees) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  
  return employees
    .map(emp => {
      const birthMonth = Math.floor(Math.random() * 12);
      const birthDate = Math.floor(Math.random() * 28) + 1;
      
      const birthThisYear = new Date(today.getFullYear(), birthMonth, birthDate);
      
      const eventDate = birthThisYear < today 
        ? new Date(today.getFullYear() + 1, birthMonth, birthDate)
        : birthThisYear;
      
      const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
      
      return {
        id: emp.id,
        name: emp.name,
        empCode: emp.employeeId || emp.id,
        department: emp.department,
        date: birthThisYear.toISOString().split('T')[0],
        birthDate: birthDate,
        birthMonth: birthMonth,
        isToday: birthDate === currentDate && birthMonth === currentMonth,
        daysUntil: daysUntil,
        eventDate: eventDate,
        fullDate: eventDate.toLocaleDateString('en-US', { 
          weekday: 'short', 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        type: 'birthday'
      };
    })
    .filter(bday => bday.daysUntil <= 30)
    .sort((a, b) => a.daysUntil - b.daysUntil);
};

// Generate anniversaries
export const generateAnniversaries = (employees) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  
  return employees
    .map(emp => {
      const joiningDate = new Date(emp.joiningDate);
      const joiningMonth = joiningDate.getMonth();
      const joiningDay = joiningDate.getDate();
      
      const anniThisYear = new Date(today.getFullYear(), joiningMonth, joiningDay);
      
      const eventDate = anniThisYear < today
        ? new Date(today.getFullYear() + 1, joiningMonth, joiningDay)
        : anniThisYear;
      
      const years = today.getFullYear() - joiningDate.getFullYear();
      
      const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
      
      return {
        id: emp.id,
        name: emp.name,
        empCode: emp.employeeId || emp.id,
        department: emp.department,
        date: anniThisYear.toISOString().split('T')[0],
        isToday: joiningDay === currentDate && joiningMonth === currentMonth,
        years: years,
        daysUntil: daysUntil,
        eventDate: eventDate,
        fullDate: eventDate.toLocaleDateString('en-US', { 
          weekday: 'short', 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        type: 'anniversary'
      };
    })
    .filter(anni => anni.daysUntil <= 30)
    .sort((a, b) => a.daysUntil - b.daysUntil);
};

// Generate leave requests
export const generateLeaveRequests = (employees, count = 20) => {
  const leaveRequests = [];
  const leaveTypes = Object.values(LEAVE_TYPES);
  
  for (let i = 0; i < count; i++) {
    const employee = employees[Math.floor(Math.random() * employees.length)];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10));
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 3) + 1);
    
    leaveRequests.push({
      id: `leave_${i}`,
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      type: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      days: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)),
      reason: ['Personal', 'Sick', 'Family Function', 'Travel'][Math.floor(Math.random() * 4)],
      status: ['Pending', 'Approved', 'Rejected'][Math.floor(Math.random() * 3)]
    });
  }
  
  return leaveRequests;
};

// Generate department-wise data for charts
export const generateDepartmentData = (employees) => {
  const deptMap = new Map();
  
  employees.forEach(emp => {
    const count = deptMap.get(emp.department) || 0;
    deptMap.set(emp.department, count + 1);
  });
  
  return Array.from(deptMap.entries()).map(([name, value]) => ({
    name,
    value,
    color: DEPARTMENT_COLORS[name] || '#6B7280'
  }));
};

// Generate trend data for charts
export const generateTrendData = () => {
  const data = [];
  const months = MONTHS;
  
  months.forEach(month => {
    data.push({
      month,
      present: Math.floor(Math.random() * 300) + 200,
      absent: Math.floor(Math.random() * 50) + 10,
      late: Math.floor(Math.random() * 40) + 10,
      leave: Math.floor(Math.random() * 30) + 5
    });
  });
  
  return data;
};

// Generate last 7 days attendance data
export const generateLast7DaysData = () => {
  const data = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  days.forEach(day => {
    data.push({
      day,
      present: Math.floor(Math.random() * 80) + 20,
      absent: Math.floor(Math.random() * 20) + 5,
      late: Math.floor(Math.random() * 15) + 5,
      leave: Math.floor(Math.random() * 10) + 2
    });
  });
  
  return data;
};

// Generate department performance data for radar chart
export const generateDeptPerformance = () => {
  const metrics = ['Attendance', 'Punctuality', 'Productivity', 'Quality', 'Teamwork', 'Initiative'];
  const departments = DEPARTMENTS.slice(0, 5);
  
  return departments.map(dept => ({
    department: dept,
    ...metrics.reduce((acc, metric) => {
      acc[metric] = Math.floor(Math.random() * 40) + 60;
      return acc;
    }, {})
  }));
};

export const getTodayAttendance = (employees) => {
  const today = new Date().toISOString().split('T')[0];
  const dayOfWeek = new Date().getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  if (isWeekend) {
    return {
      activeUsers: 0,
      todayAttendance: {
        onTime: 0,
        late: 0,
        absent: 0,
        leave: 0,
        tour: 0,
        holiday: 0,
        weeklyOff: employees.filter(e => e.status === 'ACTIVE').length
      }
    };
  }

  const activeEmployees = employees.filter(e => e.status === 'ACTIVE');
  const totalActive = activeEmployees.length;
  
  const onTime = Math.floor(totalActive * 0.6);
  const late = Math.floor(totalActive * 0.15);
  const absent = Math.floor(totalActive * 0.1);
  const leave = Math.floor(totalActive * 0.08);
  const tour = Math.floor(totalActive * 0.05);
  const holiday = 0;
  const weeklyOff = 0;
  
  const total = onTime + late + absent + leave + tour;
  const diff = totalActive - total;
  
  const adjustedOnTime = onTime + diff;
  
  return {
    activeUsers: totalActive,
    todayAttendance: {
      onTime: adjustedOnTime,
      late,
      absent,
      leave,
      tour,
      holiday,
      weeklyOff
    }
  };
};

// NEW: Generate gender-wise data
export const generateGenderWiseData = (employees) => {
  const genderMap = new Map();
  
  employees.forEach(emp => {
    const gender = emp.gender || 'Other';
    const count = genderMap.get(gender) || 0;
    genderMap.set(gender, count + 1);
  });
  
  return Array.from(genderMap.entries()).map(([name, value]) => ({
    name,
    value,
    color: GENDER_COLORS[name] || '#6B7280'
  }));
};

// NEW: Generate branch-wise data
export const generateBranchWiseData = (employees) => {
  const branchMap = new Map();
  
  employees.forEach(emp => {
    const branch = emp.branch || 'Unknown';
    const count = branchMap.get(branch) || 0;
    branchMap.set(branch, count + 1);
  });
  
  return Array.from(branchMap.entries())
    .map(([name, value]) => ({
      name,
      value,
      color: BRANCH_COLORS[name] || '#6B7280'
    }))
    .sort((a, b) => b.value - a.value);
};

// NEW: Generate designation-wise data
export const generateDesignationWiseData = (employees) => {
  const desigMap = new Map();
  
  employees.forEach(emp => {
    const count = desigMap.get(emp.designation) || 0;
    desigMap.set(emp.designation, count + 1);
  });
  
  return Array.from(desigMap.entries())
    .map(([name, value]) => ({
      name,
      value,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    }))
    .sort((a, b) => b.value - a.value);
};

// NEW: Generate department-wise with gender breakdown
export const generateDepartmentGenderData = (employees) => {
  const deptGenderMap = new Map();
  
  employees.forEach(emp => {
    const dept = emp.department;
    const gender = emp.gender || 'Other';
    
    if (!deptGenderMap.has(dept)) {
      deptGenderMap.set(dept, { Male: 0, Female: 0, Other: 0, total: 0 });
    }
    
    const deptData = deptGenderMap.get(dept);
    deptData[gender] = (deptData[gender] || 0) + 1;
    deptData.total += 1;
  });
  
  return Array.from(deptGenderMap.entries()).map(([department, data]) => ({
    department,
    ...data
  }));
};

// NEW: Generate designation-wise with branch breakdown
export const generateDesignationBranchData = (employees) => {
  const desigBranchMap = new Map();
  
  employees.forEach(emp => {
    const designation = emp.designation;
    const branch = emp.branch || 'Unknown';
    
    if (!desigBranchMap.has(designation)) {
      desigBranchMap.set(designation, new Map());
    }
    
    const branchMap = desigBranchMap.get(designation);
    const count = branchMap.get(branch) || 0;
    branchMap.set(branch, count + 1);
  });
  
  return Array.from(desigBranchMap.entries()).map(([designation, branchMap]) => ({
    designation,
    branches: Array.from(branchMap.entries()).map(([branch, count]) => ({
      branch,
      count
    }))
  }));
};

// NEW: Generate comprehensive employee analytics
export const generateEmployeeAnalytics = (employees) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === EMPLOYEE_STATUS.ACTIVE).length;
  const maleCount = employees.filter(e => e.gender === 'Male').length;
  const femaleCount = employees.filter(e => e.gender === 'Female').length;
  const otherCount = employees.filter(e => e.gender === 'Other').length;
  
  return {
    overview: {
      totalEmployees,
      activeEmployees,
      inactiveEmployees: totalEmployees - activeEmployees,
      maleCount,
      femaleCount,
      otherCount,
      malePercentage: ((maleCount / totalEmployees) * 100).toFixed(1),
      femalePercentage: ((femaleCount / totalEmployees) * 100).toFixed(1),
      otherPercentage: ((otherCount / totalEmployees) * 100).toFixed(1),
      branchCount: new Set(employees.map(e => e.branch)).size,
      departmentCount: new Set(employees.map(e => e.department)).size,
      designationCount: new Set(employees.map(e => e.designation)).size
    },
    genderWise: generateGenderWiseData(employees),
    branchWise: generateBranchWiseData(employees),
    departmentWise: generateDepartmentData(employees),
    designationWise: generateDesignationWiseData(employees),
    departmentGender: generateDepartmentGenderData(employees),
    designationBranch: generateDesignationBranchData(employees)
  };
};

// Default export with all generators
export default {
  generateEmployees,
  generateEmployeeAttendance,
  generateRecentPunches,
  generateBirthdays,
  generateAnniversaries,
  generateLeaveRequests,
  generateDepartmentData,
  generateTrendData,
  generateLast7DaysData,
  generateDeptPerformance,
  getTodayAttendance,
  generateGenderWiseData,
  generateBranchWiseData,
  generateDesignationWiseData,
  generateDepartmentGenderData,
  generateDesignationBranchData,
  generateEmployeeAnalytics
};