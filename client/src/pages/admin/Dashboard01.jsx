import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Dummy data
const lineData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 300 },
  { month: "Mar", users: 500 },
  { month: "Apr", users: 200 },
  { month: "May", users: 600 },
];

const pieData = [
  { name: "Free Users", value: 800 },
  { name: "Premium Users", value: 400 },
  { name: "Enterprise Users", value: 100 },
];

const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

const recentActivities = [
  { id: 1, user: "Alice", action: "Signed up", date: "2025-05-08" },
  { id: 2, user: "Bob", action: "Upgraded to premium", date: "2025-05-07" },
  { id: 3, user: "Charlie", action: "Logged in", date: "2025-05-06" },
];

// Stat card component
const StatCard = ({ title, value }) => (
  <div style={cardStyle}>
    <h4 style={{ color: "#666" }}>{title}</h4>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
  </div>
);

const cardStyle = {
  background: "#fff",
  padding: "1rem",
  borderRadius: "1rem",
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  textAlign: "center",
};

// Main Dashboard
export default function Dashboard() {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>📊 Dashboard</h2>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        <StatCard title="Total Users" value="1,245" />
        <StatCard title="New Signups" value="230" />
        <StatCard title="Active Users" value="876" />
        <StatCard title="Revenue" value="$4,580" />
      </div>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "1fr 1fr",
          marginTop: "2rem",
        }}
      >
        {/* Line Chart */}
        <div style={cardStyle}>
          <h3>Monthly Signups</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div style={cardStyle}>
          <h3>User Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div style={{ ...cardStyle, marginTop: "2rem" }}>
        <h3>Recent Activities</h3>
        <table
          style={{
            width: "100%",
            marginTop: "1rem",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
              <th style={{ padding: "0.5rem" }}>User</th>
              <th style={{ padding: "0.5rem" }}>Action</th>
              <th style={{ padding: "0.5rem" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id}>
                <td
                  style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}
                >
                  {activity.user}
                </td>
                <td
                  style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}
                >
                  {activity.action}
                </td>
                <td
                  style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}
                >
                  {activity.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
