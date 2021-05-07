import { colorIndicator } from '../utils';

export const buildAqiColor = (aqi) => {
  if (aqi >= 0 && aqi <= 50) return colorIndicator.good;
  if (aqi > 50 && aqi <= 100) return colorIndicator.satisfactory;
  if (aqi > 100 && aqi <= 200) return colorIndicator.moderate;
  if (aqi > 200 && aqi <= 300) return colorIndicator.poor;
  if (aqi > 300 && aqi <= 400) return colorIndicator.veryPoor;
  if (aqi > 400 && aqi <= 500) return colorIndicator.severe;
}

export const buildAqiStatus = (aqi) => {
  if (aqi >= 0 && aqi <= 50) return "Good";
  if (aqi > 50 && aqi <= 100) return "Satisfactory";
  if (aqi > 100 && aqi <= 200) return "Moderate";
  if (aqi > 200 && aqi <= 300) return "Poor";
  if (aqi > 300 && aqi <= 400) return "Very Poor";
  if (aqi > 400 && aqi <= 500) return "Severe";
}