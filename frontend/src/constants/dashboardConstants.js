
import { 
  Home, Users, Clock3, CalendarDays, FileSpreadsheet,
  Calendar, Phone, Megaphone, Calendar as CalendarIcon, CalendarDays as CalendarDaysIcon,
  LayoutDashboard, Settings, TrendingUp, Bell, UserPlus,
  Moon, Sun, ChevronLeft, ChevronRight, LogOut, HelpCircle, 
  FileText, Shield, Eye, EyeOff, ChevronDown, ChevronUp, MapPin, Clock,
  AlertCircle, CheckCircle, XCircle, Briefcase, UserCheck, BarChart,
  FolderTree, UserCog, BadgeCheck, Key, Upload, Image, FileSpreadsheet as FileSpreadsheetIcon,
  Users as UsersIcon, Gift, GitBranch, PieChart, CalendarRange, Map,
  UserMinus, UserPlus as UserPlusIcon, UserCheck as UserCheckIcon, ShieldCheck,
  Settings as SettingsIcon, Sun as SunIcon, Moon as MoonIcon, Eye as EyeIcon,
  EyeOff as EyeOffIcon, LogOut as LogOutIcon, HelpCircle as HelpCircleIcon,
  FileText as FileTextIcon, BarChart as BarChartIcon, PieChart as PieChartIcon,
  TrendingUp as TrendingUpIcon, Download, Printer, Copy, Edit, Trash2,
  Plus, Search, Filter, RefreshCw, CheckSquare, Square, AlertTriangle,
  Info, X, Check, CreditCard, DollarSign, Calculator, Percent,
  Calendar as CalendarIcon2, Clock as ClockIcon2, MapPin as MapPinIcon2,
  Briefcase as BriefcaseIcon2, Users as UsersIcon2, User as UserIcon,
  UserCircle, UserPlus as UserPlusIcon2, UserMinus as UserMinusIcon2,
  UserCheck as UserCheckIcon2, UserX, Shield as ShieldIcon2,
  Settings as SettingsIcon2, LogOut as LogOutIcon2, HelpCircle as HelpCircleIcon2,
  Menu, Grid, List, Layout, Columns, Layers, Minimize, Maximize,Fingerprint,Send
} from 'lucide-react';

// Main Navigation Items
export const MAIN_NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Employee', icon: Users, path: '/employees' },
  { name: 'Attendance', icon: Clock3, path: '/attendance' },
  { name: 'Leave', icon: CalendarDays, path: '/leave' },
  { name: 'Payroll', icon: FileSpreadsheet, path: '/payroll' },
];

// Sidebar content based on main navigation selection
export const SIDEBAR_CONTENT = {
  Dashboard: {
    manage: [
      { name: 'Dashboard Settings', icon: SettingsIcon2 },
      { name: 'Widget Manager', icon: Layout },
      { name: 'Report Scheduler', icon: Calendar },
    ],
    feature: [
      { name: 'Quick Actions', icon: Plus },
      { name: 'Recent Activities', icon: RefreshCw },
    ],
    report: [
      { name: 'Dashboard Analytics', icon: TrendingUpIcon },
      { name: 'User Activity Log', icon: FileTextIcon },
    ]
  },
  Home: {
    manage: [
      { name: 'Important Dates', icon: CalendarIcon2 },
      { name: 'Important Numbers', icon: Phone },
      { name: 'Announcements', icon: Megaphone },
    ],
    report: [
      { name: 'View Important Dates Calendar', icon: CalendarRange },
      { name: 'Complete Session Calendar', icon: CalendarDays },
    ]
  },
  Employee: {
    manage: [
      { name: 'Department', icon: FolderTree },
      { name: 'Employee Role', icon: UserCog },
      { name: 'Designation', icon: BadgeCheck },
      { name: 'Add/Edit Employee', icon: UserPlusIcon2 },
    ],
    feature: [
      { name: 'Update Information', icon: Edit },
      { name: 'Assign Reporting Hierarchy', icon: GitBranch },
      { name: 'Assign Employee Role', icon: UserCheckIcon2 },
      { name: 'Reset Password', icon: Key },
      { name: 'Employee Data Upload', icon: Upload },
      { name: 'Upload Employee Image(s)', icon: Image },
    ],
    report: [
      { name: 'Details Record', icon: FileTextIcon },
      { name: 'Self Profile', icon: UserCircle },
      { name: 'Reporting List', icon: UsersIcon2 },
      { name: 'Birthday List', icon: Gift },
      { name: 'Print Detail', icon: Printer },
      { name: 'Anniversary List', icon: Calendar },
      { name: 'Reporting Hierarchy', icon: GitBranch },
      { name: 'Head Count Details', icon: BarChartIcon },
    ]
  },
  Attendance: {
    manage: [
      { name: 'Configuration', icon: SettingsIcon2 },
      { name: 'Holiday', icon: SunIcon },
      { name: 'Shift', icon: ClockIcon2 },
      { name: 'Assign Shift', icon: UserCheckIcon2 },
      { name: 'Biometric Id', icon: Fingerprint },
    ],
    feature: [
      { name: 'OD Tour/Visit', icon: MapPinIcon2 },
      { name: 'Manual Attendance Entry', icon: Edit },
      { name: 'Regularize Attendance', icon: CheckCircle },
      { name: 'Monthly Regularize Attendance', icon: Calendar },
      { name: 'Swipe Request', icon: RefreshCw },
      { name: 'Update Swipe Request', icon: Edit },
    ],
    report: [
      { name: 'Attendance Calendar', icon: CalendarDays },
      { name: 'Daily Detailed Report', icon: FileTextIcon },
      { name: 'Daily In/Out Punch Report', icon: Clock },
      { name: 'Monthly Register', icon: Calendar },
      { name: 'Monthly Detailed Duration Report', icon: BarChartIcon },
      { name: 'Monthly OT Report', icon: TrendingUpIcon },
      { name: 'Monthly Late Report', icon: AlertTriangle },
      { name: 'Log Records', icon: FileTextIcon },
      { name: 'Regularize Report', icon: CheckSquare },
      { name: 'Manual Entry Report', icon: Edit },
      { name: 'OD Tour/Visit Record', icon: Map },
      { name: 'Date Range Attendance Record (Grid)', icon: Grid },
      { name: 'My Monthly Attendance Record', icon: UserIcon },
      { name: 'Date Range Attendance Record (List)', icon: List },
      { name: 'Monthly Punching Report', icon: Clock },
      { name: 'Attendance Report', icon: BarChartIcon },
      { name: 'Yearly Attendance Record', icon: Calendar },
    ]
  },
  Leave: {
    manage: [
      { name: 'Leave Rule', icon: SettingsIcon2 },
      { name: 'Leave Type', icon: CalendarDays },
      { name: 'Assign Leave Type', icon: UserCheckIcon2 },
    ],
    feature: [
      { name: 'Apply Leave', icon: Plus },
      { name: 'Apply Employee Leave', icon: UserPlusIcon2 },
      { name: 'Approve/Reject Leaves', icon: CheckCircle },
      { name: 'Apply Short Leave', icon: Clock },
      { name: 'Carry-Forward', icon: RefreshCw },
    ],
    report: [
      { name: 'Leave', icon: CalendarDays },
      { name: 'Types of Leaves', icon: List },
      { name: 'Yearly Leave Record', icon: Calendar },
      { name: 'My Leave Record', icon: UserIcon },
      { name: 'My Leaves for Approval', icon: CheckCircle },
      { name: 'My Approved Leaves', icon: CheckSquare },
    ]
  },
  Payroll: {
    manage: [
      { name: 'Payroll Config Master', icon: SettingsIcon2 },
      { name: 'Salary Heads', icon: CreditCard },
      { name: 'Formula Editor', icon: Calculator },
      { name: 'PT Editor', icon: Percent },
      { name: 'PF Rate Editor', icon: Percent },
      { name: 'ESI Rate Editor', icon: Percent },
      { name: 'Gratuity Editor', icon: DollarSign },
      { name: 'Income Tax Slab Editor', icon: Calculator },
      { name: 'Challan Deposit Date Configuration', icon: Calendar },
      { name: 'Salary Template', icon: FileSpreadsheetIcon },
    ],
    feature: [
      { name: 'Payroll Info Entry', icon: Edit },
      { name: 'Payroll Indexing', icon: TrendingUpIcon },
      { name: 'Salary Advance', icon: CreditCard },
      { name: 'Loan', icon: DollarSign },
      { name: 'Arrear Config', icon: SettingsIcon2 },
      { name: 'Config Salary', icon: SettingsIcon2 },
      { name: 'Monthly Salary Days', icon: Calendar },
      { name: 'Salary Calculation', icon: Calculator },
      { name: 'Salary Dispatch', icon: Send },
    ],
    report: [
      { name: 'Salary Details', icon: FileTextIcon },
      { name: 'Salary Details (Yearly)', icon: Calendar },
      { name: 'PT Details (Monthly)', icon: FileTextIcon },
      { name: 'PF Record (Monthly)', icon: FileTextIcon },
      { name: 'ESI Record (Monthly)', icon: FileTextIcon },
      { name: 'Gratuity Record', icon: FileTextIcon },
      { name: 'Monthly Loan Record', icon: FileTextIcon },
      { name: 'Salary Letter to bank', icon: FileTextIcon },
      { name: 'Advance Record', icon: FileTextIcon },
      { name: 'Pay slip (Monthly)', icon: FileTextIcon },
      { name: 'Salary Certificate', icon: FileTextIcon },
      { name: 'My Monthly Pay Slip', icon: FileTextIcon },
      { name: 'Bank Transaction Report', icon: FileTextIcon },
      { name: 'Salary Summary Report', icon: BarChartIcon },
    ]
  }
};

// Component Visibility Settings
export const COMPONENT_VISIBILITY = {
  statsCards: { name: 'Statistics Cards', default: true },
  charts: { name: 'Charts', default: true },
  recentPunches: { name: 'Recent Punches', default: true },
  employeeTable: { name: 'Employee Table', default: true },
  performanceCharts: { name: 'Performance Charts', default: true },
  importantSection: { name: 'Important Section', default: true },
  combinedEvents: { name: 'Combined Events', default: true },
  searchAndFilter: { name: 'Search & Filter', default: true },
  threeColumn: { name: 'Three Column Section', default: true },
  settings: { name: 'Settings Panel', default: false },
  dashboardCards: { name: 'Dashboard Cards', default: true },
};

// Important Dates
export const IMPORTANT_DATES = [
  { title: 'Board Meeting', date: 'Mar 15, 2026', type: 'meeting', icon: Calendar },
  { title: 'Salary Day', date: 'Apr 01, 2026', type: 'payroll', icon: FileSpreadsheet },
  { title: 'Company Holiday', date: 'Apr 15, 2026', type: 'holiday', icon: CalendarDaysIcon },
  { title: 'Review Cycle', date: 'Apr 30, 2026', type: 'review', icon: UserCheck },
];

// Important Numbers
export const IMPORTANT_NUMBERS = [
  { label: 'Emergency', number: '+91 12345 67890', type: 'emergency', icon: Phone },
  { label: 'IT Support', number: '+91 98765 43210', type: 'it', icon: Briefcase },
  { label: 'HR Helpline', number: '+91 11223 44556', type: 'hr', icon: Users },
  { label: 'Security', number: '+91 55667 88990', type: 'security', icon: Shield },
];

// Announcements
export const ANNOUNCEMENTS = [
  { title: 'Office Closed on Holi', date: 'Mar 25, 2026', priority: 'high', icon: Megaphone },
  { title: 'New HR Policy Update', date: 'Mar 20, 2026', priority: 'medium', icon: FileText },
  { title: 'Team Building Event', date: 'Mar 28, 2026', priority: 'low', icon: Users },
  { title: 'System Maintenance', date: 'Mar 18, 2026', priority: 'high', icon: Settings },
];

// Dashboard Stats Types
export const STATS_TYPES = {
  ACTIVE_USER: 'ACTIVE USER',
  ON_TIME: 'ON TIME',
  LATE: 'LATE',
  ABSENT: 'ABSENT',
  LEAVE: 'LEAVE',
  TOUR: 'TOUR',
  HOLIDAY: 'HOLIDAY',
  WEEKLY_OFF: 'WEEKLY OFF'
};

// Chart Colors
export const CHART_COLORS = {
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  pink: '#EC4899',
  teal: '#14B8A6',
  orange: '#F97316',
  cyan: '#06B6D4',
  indigo: '#6366F1'
};

// Time Ranges
export const TIME_RANGES = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year'
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  TIME: 'HH:mm',
  FULL: 'MMM dd, yyyy HH:mm'
};

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

// Export all as default for convenience
export default {
  MAIN_NAV_ITEMS,
  SIDEBAR_CONTENT,
  COMPONENT_VISIBILITY,
  IMPORTANT_DATES,
  IMPORTANT_NUMBERS,
  ANNOUNCEMENTS,
  STATS_TYPES,
  CHART_COLORS,
  TIME_RANGES,
  DATE_FORMATS,
  NOTIFICATION_TYPES
};