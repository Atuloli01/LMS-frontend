import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const lineData = [
  { month: "Jan", students: 240 },
  { month: "Feb", students: 320 },
  { month: "Mar", students: 280 },
  { month: "Apr", students: 350 },
  { month: "May", students: 400 },
];

const pieData = [
  { name: "Passed", value: 70 },
  { name: "Failed", value: 30 },
];

const COLORS = ["#10b981", "#ef4444"];

const activities = [
  { id: 1, student: "Alice", action: "Completed Module 1", date: "2025-05-07" },
  { id: 2, student: "Bob", action: "Submitted Quiz", date: "2025-05-06" },
  { id: 3, student: "Charlie", action: "Joined Course", date: "2025-05-05" },
];

const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 text-center">
    <h4 className="text-gray-500 dark:text-gray-400">{title}</h4>
    <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
  </div>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      <h2 className="text-3xl font-semibold mb-4">📚 LMS Dashboard</h2>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Students" value="1,200" />
        <StatCard title="Active Courses" value="24" />
        <StatCard title="Assignments Submitted" value="8,430" />
        <StatCard title="Instructors" value="16" />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <h3 className="mb-2 font-semibold">Monthly Enrollment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <h3 className="mb-2 font-semibold">Exam Results</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
        <h3 className="mb-4 font-semibold">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-sm text-gray-500 dark:text-gray-400">
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Activity</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((act) => (
                <tr
                  key={act.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl text-sm"
                >
                  <td className="px-4 py-2">{act.student}</td>
                  <td className="px-4 py-2">{act.action}</td>
                  <td className="px-4 py-2">{act.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
