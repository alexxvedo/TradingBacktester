import React, { memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StaticLineChart = memo(
  ({ data }) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    );
  },
  (prevProps, nextProps) => {
    // Esto puede ser ajustado según lo que específicamente podría causar una re-renderización innecesaria
    return prevProps.data === nextProps.data;
  }
);

StaticLineChart.displayName = "StaticLineChart";

export default StaticLineChart;
