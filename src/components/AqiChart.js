import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { buildAqiColor, timeAgo, buildAqiStatus } from '../utils';

const CustomTooltip = ({ payload, label, active }) => {
  if (active) {
    return (
      <div className="custom-tooltip" style={{backgroundColor: buildAqiColor(payload[0].value)}}>
        <h3>{buildAqiStatus(payload[0].value)}</h3>
        <p className="city">{label}</p>
        <p className="aqi">{`Aqi : ${payload[0].value.toFixed(2)}`}</p>
        <p className="updatedAt">{`Last Updated: ${timeAgo(payload[0].payload.timestamp)}`}</p>
      </div>
    );
  }

  return null;
}

const RectangleBar = (props) => {
  const {
    x, y, width, height, aqi
  } = props;

  return <rect x={x} y={y} width={width} height={height} style={{fill:buildAqiColor(aqi)}} />;
};

const AqiChart = ({ aqiData }) => {
  const data = Object.keys(aqiData).reduce((initial, current) => {
    initial = [...initial, aqiData[current]];
    return initial;
  }, []);
  return (
    <div className="chartWrapper">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="city" stroke="#fff" />
          <YAxis tickCount={25} stroke="#fff" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="aqi" fill="#fff" shape={<RectangleBar />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AqiChart;
