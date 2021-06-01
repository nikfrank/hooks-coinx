import React, { useMemo } from 'react';
import { Line as RendersAlotLine } from 'react-chartjs-2';

const Line = React.memo(RendersAlotLine);

const options = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'btc-axis',
        startAtZero: true,
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'eth-axis',
        gridLines: {
          drawOnArea: false,
        },
        startAtZero: true,
      },
    ],
  },
};


export const Chart = React.memo(({
  exchanges: { BTC, ETH } = { BTC: [], ETH: [] },
  theme,
})=>{
  const chartData = useMemo(()=> {
    return ({
      labels: BTC.map(({ time })=> {
        const d = new Date(time * 1000);
        return `${d.getMonth()+1} / ${d.getDate()}`
      }),
      datasets: [
        {
          label: 'BTC in USD',
          data: BTC.map(({ open })=> open),
          fill: false,
          backgroundColor: theme === 'pastel' ?
                           '#ff6384': '#f00',
          borderColor: theme === 'pastel' ?
                       '#ff638231' : '#f003',
          yAxisID: 'btc-axis',
        },
        {
          label: 'ETH in USD',
          data: ETH.map(({ open })=> open),
          fill: false,
          backgroundColor: theme === 'pastel' ?
                           '#63ff84': '#0f0',
          borderColor: theme === 'pastel' ?
                       '#63ff8231' : '#0f03',
          yAxisID: 'eth-axis',
        },
      ],
    })
  }, [BTC, ETH, theme]);

  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        width: '80vw',
        height: '80vh',
      }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
});
