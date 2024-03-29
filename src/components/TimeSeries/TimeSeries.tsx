'use client';

import { EventObject } from '@/utils/convertToObject';
import plotlyTimeSeries from '@/utils/plotlyTimeSeries';

import Plot from 'react-plotly.js';

export default function TimeSeries({ event }: { event: EventObject[] }) {
  const data = plotlyTimeSeries(event);

  return (
    <Plot
      data={data}
      style={{ width: '100%' }}
      layout={{
        height: 450,
        showlegend: true,
        legend: { orientation: 'h' },
        yaxis: { title: 'Memory' },
        yaxis2: {
          title: 'CPU / MEM %',
          overlaying: 'y',
          side: 'right'
        },
        margin: {
          t: 0
        }
      }}
      config={{
        responsive: true
      }}
    />
  );
}
