import {
  FaUser,
  FaUserTie,
  FaCheck,
  FaTimes,
  FaClipboardList,
} from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";

export const dashboardCards = [
  {
    key: "totalCountOfEmployee",
    title: "Total Employees",
    subtitle: "All Employees",
    icon: <FaUser size={26} />,
  },
  {
    key: "totalHr",
    title: "Total HR",
    subtitle: "HR Members",
    icon: <FaUserTie size={26} />,
  },
  {
    key: "totalAdmin",
    title: "Total Admin",
    subtitle: "Administrators",
    icon: <FaUserTie size={26} />,
  },
  {
    key: "presentToday",
    title: "Present Today",
    subtitle: "Checked In",
    icon: <FaCheck size={26} />,
  },
  {
    key: "halfDayToday",
    title: "Half Day",
    subtitle: "Half Day Employees",
    icon: <LuClock3 size={26} />,
  },
  {
    key: "absentToday",
    title: "Absent Today",
    subtitle: "Absent Employees",
    icon: <FaTimes size={26} />,
  },
  {
    key: "pendingLeaves",
    title: "Pending Leaves",
    subtitle: "Awaiting Approval",
    icon: <FaClipboardList size={26} />,
  },
];
export const employeeCardKeys = [
  "presentToday",
  "halfDayToday",
  "absentToday",
];