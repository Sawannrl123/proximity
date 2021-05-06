import React from 'react';
import { colorIndicator } from '../utils';

const AqiIndicator = () => {
  return (
    <ul className="indicator">
      <li>
        <span style={{backgroundColor: colorIndicator.good}}></span>
        <span>0-50 (Good)</span>
      </li>
      <li>
        <span style={{backgroundColor: colorIndicator.satisfactory}}></span>
        <span>50-100 (Satisfactory)</span>
      </li>
      <li>
        <span style={{backgroundColor: colorIndicator.moderate}}></span>
        <span>100-200 (Moderate)</span>
      </li>
      <li>
        <span style={{backgroundColor: colorIndicator.poor}}></span>
        <span>200-300 (Poor)</span>
      </li>
      <li>
        <span style={{backgroundColor: colorIndicator.veryPoor}}></span>
        <span>300-400 (Very Poor)</span>
      </li>
      <li>
        <span style={{backgroundColor: colorIndicator.severe}}></span>
        <span>400-500 (Severe)</span>
      </li>
    </ul>
  )
}

export default AqiIndicator;
