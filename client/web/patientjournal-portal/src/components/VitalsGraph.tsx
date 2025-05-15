import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Customized,
} from 'recharts';

interface VitalsData {
  labels: string[];
  systolic: number[];
  diastolic: number[];
  heartRate: number[];
  temperature: number[];
}

interface VitalsGraphProps {
  vitalData: VitalsData | null | undefined;
}
// Define the custom overlay component

function CustomOverlay(props: any) {
  const { width = 0, height = 0, margin = { left: 0, right: 0 } } = props;

  return (
    <>
      <rect
        x={margin.left}
        y={40}
        width={width - margin.left - margin.right}
        height={20}
        fill="rgba(0, 255, 0, 0.2)"
      />
      <rect
        x={margin.left}
        y={80}
        width={width - margin.left - margin.right}
        height={20}
        fill="rgba(0, 255, 0, 0.2)"
      />
    </>
  );
}




export default function VitalsGraph({ vitalData }: VitalsGraphProps) {
  if (!vitalData || !vitalData.labels || vitalData.labels.length === 0) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant="body2">No vital data available.</Typography>
      </Box>
    );
  }
  console.log("This is vital data" , vitalData);
  const chartData = vitalData.labels.map((label, i) => ({
    date: label,
    systolic: vitalData.systolic[i],
    diastolic: vitalData.diastolic[i],
    heartRate: vitalData.heartRate[i],
    temperature: vitalData.temperature[i],
  })).filter(d =>
    [d.systolic, d.diastolic, d.heartRate, d.temperature].some(v => typeof v === 'number' && !isNaN(v))
  );
  console.log("This is chart data" , chartData);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Vitals Over Time</Typography>

      {/* Blood Pressure Chart */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1">Blood Pressure (mmHg)</Typography>
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis 
            unit=" mmHg" 
            ticks={[ 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160]}
          />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="systolic" stroke="red" />
          <Line type="monotone" dataKey="diastolic" stroke="blue" />

          <Customized component={CustomOverlay} />
        </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Heart Rate Chart */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1">Heart Rate (bpm)</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis unit=" bpm" />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="heartRate" stroke="green" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Body Temperature Chart */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">Body Temperature (°F)</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis unit="°F" />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="temperature" stroke="orange" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
