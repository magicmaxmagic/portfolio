"use client";

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down";
}

export function MetricCard({ label, value, unit, icon, trend }: MetricCardProps) {
  return (
    <div className="glass p-6 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            {label}
          </p>
          <p className="text-3xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>
            {value}
            {unit && <span className="text-lg ml-1">{unit}</span>}
          </p>
        </div>
        {icon && <div className="text-2xl opacity-50">{icon}</div>}
      </div>
      {trend && (
        <div className="mt-2 text-xs" style={{ color: trend === "up" ? "#22c55e" : "#ef4444" }}>
          {trend === "up" ? "↑" : "↓"} {trend === "up" ? "Increasing" : "Decreasing"}
        </div>
      )}
    </div>
  );
}

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface BarChartCardProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  xAxisKey?: string;
}

export function BarChartCard({ title, data, dataKey, xAxisKey = "name" }: BarChartCardProps) {
  return (
    <div className="glass p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis dataKey={xAxisKey} stroke="var(--text-secondary)" />
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
          />
          <Bar dataKey={dataKey} fill="var(--accent-blue)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface LineChartCardProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  xAxisKey?: string;
}

export function LineChartCard({ title, data, dataKey, xAxisKey = "name" }: LineChartCardProps) {
  return (
    <div className="glass p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
          <XAxis dataKey={xAxisKey} stroke="var(--text-secondary)" />
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="var(--accent-purple)"
            strokeWidth={2}
            dot={{ fill: "var(--accent-purple)", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface PieChartCardProps {
  title: string;
  data: ChartData[];
  dataKey: string;
  nameKey?: string;
}

export function PieChartCard({ title, data, dataKey }: PieChartCardProps) {
  const colors = ["var(--accent-blue)", "var(--accent-purple)", "var(--accent-rose)", "#10b981", "#f59e0b"];

  return (
    <div className="glass p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey={dataKey}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
              color: "var(--text-primary)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TimelineItem({
  year,
  title,
  description,
  isLast,
}: {
  year: string;
  title: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <div className="relative pb-8">
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: "var(--accent-blue)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--accent-blue)" }} />
          </div>
          {!isLast && (
            <div
              className="w-1 flex-1 mt-2"
              style={{ backgroundColor: "var(--border-color)" }}
            />
          )}
        </div>
        <div className="pb-4">
          <p className="font-semibold" style={{ color: "var(--accent-blue)" }}>
            {year}
          </p>
          <h4 className="text-lg font-bold mt-1" style={{ color: "var(--text-primary)" }}>
            {title}
          </h4>
          <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export interface ArchitectureNodeProps {
  title: string;
  items: string[];
}

export function ArchitectureDiagram({ nodes }: { nodes: ArchitectureNodeProps[] }) {
  return (
    <div className="glass p-8 rounded-lg overflow-x-auto">
      <div className="flex gap-8 min-w-max justify-center">
        {nodes.map((node, index) => (
          <div key={index} className="flex flex-col items-center min-w-max">
            <div
              className="p-4 rounded-lg border-2 w-48 text-center"
              style={{
                borderColor: "var(--accent-blue)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <h4 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                {node.title}
              </h4>
              <ul className="mt-3 space-y-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                {node.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            {index < nodes.length - 1 && (
              <div className="text-2xl mt-4" style={{ color: "var(--accent-blue)" }}>
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
