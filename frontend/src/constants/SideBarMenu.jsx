import {
    BsHouseDoor,
    BsCalendar2Check,
    BsPeople,
    BsCalendarCheck,
    BsGear,
    BsBoxArrowRight
} from 'react-icons/bs';
export const menu = [
  {
    name: "Dashboard",
    path: "/admin/adminDashboard",
    icon: BsHouseDoor,
  },
  {
    name: "Employee",
    path: "/admin/employee",
    icon: BsPeople,
  },
  {
    name: "Attendance",
    path: "/admin/attendance",
    icon: BsCalendarCheck,
  },
  {
    name: "Leave",
    path: "/admin/leave",
    icon: BsCalendar2Check,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: BsGear,
  },
  {
    name: "Logout",
    path: "/logout",
    icon: BsBoxArrowRight,
  },
];