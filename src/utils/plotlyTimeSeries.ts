import { EventObject } from './convertToObject';

export default function plotlyTimeSeries(event: EventObject[]) {
  let timeX: string[] = [];
  let cpuY: string[] = [];
  let memY: string[] = [];
  let vszY: string[] = [];
  let rssY: string[] = [];

  event.map(step => {
    timeX.push(step.time);
    cpuY.push(step.cpu);
    memY.push(step.mem);
    vszY.push(step.vsz);
    rssY.push(step.rss);

    return step;
  });

  return [
    {
      x: timeX,
      y: cpuY,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'red' },
      name: 'CPU %',
      yaxis: 'y2'
    },
    {
      x: timeX,
      y: memY,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
      name: 'Memory %',
      yaxis: 'y2'
    },
    {
      x: timeX,
      y: vszY,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'orange' },
      name: 'Memory (Allocated)'
    },
    {
      x: timeX,
      y: rssY,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'green' },
      name: 'Memory (Wired)'
    }
  ];
}
