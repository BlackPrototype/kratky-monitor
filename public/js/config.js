let chartName = 'Kratky Monitor',
    humidityName = 'Humidity %',
    tempName = 'Temperature °C',
    waterLvlName = 'Water Level';

let chartConf = {
      type: 'line',
      data: {
        datasets: [{
          label: tempName,
          hidden: false,
          borderColor: "#009999",
          tension: 0.1,
          fill: false,
          parsing: {
            yAxisKey: 'temperature'
          },
          normalized: true
        },
        {
          label: humidityName,
          hidden: false,
          borderColor: "#70db70",
          tension: 0.1,
          fill: false,
          parsing: {
            yAxisKey: 'humidity'
          },
          normalized: true
        },
        {
          label: waterLvlName,
          hidden: true,
          borderColor: "#1a75ff",
          tension: 0.1,
          fill: false,
          parsing: {
            yAxisKey: 'water_level'
          },
          normalized: true
        }]
      },
      options: {
        parsing: {
          xAxisKey: 'date'
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function(item) {
                return new Date(item[0].label).toISOString();
              }
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute'       
            }
          },
          y: {
            min: 0
          }
        }
      }
    }
