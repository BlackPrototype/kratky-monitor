let jsonData = [],
    subtractTime = 60 * 60 * 1000,
    ctx = document.getElementById('kratky-chart').getContext('2d'),
    kratkyChart = new Chart(ctx, chartConf),
    fromDatePicker = document.getElementById("fromDateTime"),
    toDatePicker = document.getElementById("toDateTime"),
    loading = document.getElementById("loading");

const isEmpty = (val) => {
  return typeof val == 'undefined' || val == null
}

const cutMs = (time) => {
  return time.split('.')[0]
}

const chartUpdate = (chart) => {
  const datasets = chart.data.datasets
  if (datasets.length > 0) {
    let jData = []
        _from = cutMs(fromDatePicker.value),
        _to = cutMs(toDatePicker.value);

    jData.unshift(jsonData.filter((o) => {
        if (_from <= cutMs(o.date) && cutMs(o.date) <= _to) {
          return o;
        }
      })
    );

    for(let i = 0; i <= datasets.length - 1; i++) { 
      datasets[i].data = jData.flat()
    }

    chart.update()
    loading.innerHTML = ''
  }
}

const onChange = () => {
  loading.innerHTML = 'Loading...'
  setTimeout(() => {
    chartUpdate(kratkyChart, fromDatePicker.value, toDatePicker.value)
  }, 100)
}

fromDatePicker.onchange = () => onChange()
toDatePicker.onchange = () => onChange()

$.get('/public/results.txt', (data, status) => {
  document.getElementById("raw").innerHTML =
    data.split("\n").map((chunk) => {
      try {
        return JSON.parse(chunk)
      } catch (error) {
        return
      }
    }).sort((a, b) => {
      return b.date.localeCompare(a.date)
    }).map((json) => {
      if (!isEmpty(json)) {
        json.water_level = Math.floor((json.water_level / 500) * 100)
        jsonData.push(json)
      }
      return JSON.stringify(json) + '<br>'
    })
}).done(() => {
  let deltaTime = new Date().getTime() - subtractTime
  fromDatePicker.value = cutMs(new Date(deltaTime).toISOString())
  toDatePicker.value = cutMs(new Date().toISOString())
  chartUpdate(kratkyChart)
});
