const humidityDisplay =
document.getElementById('humidity-display')
const temperatureDisplay = 
document.getElementById('temperature-display')

const fetchTemperature = () => {
  fetch('/temperature')
  .then (results => {
  return results.json()
})
  .then(data => {
   const now = new Date()
   const timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
   pushData(temperatureChartConfig.data.labels, timeNow, 10)
   pushData(temperatureChartConfig.data.datasets[0].data, data.value, 10)
   temperatureChart.update()
   temperatureDisplay.innerHTML = '<strong>' + data.value + '</strong>'
})
}

const fetchHumidity = () => {
  fetch('/humidity')
  .then(results => {
  return results.json()
  })
  .then(data => {
  const now = new Date()
  const timenow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  pushData(humidityChartConfig.data.labels, timenow, 10)
  pushData(humidityChartConfig.data.datasets[0].data, data.value, 10)
  humidityChart.update()
  temperatureDisplay.innerHTML = '<strong>' + data.value + '</strong>'
   })
}

setInterval( () => {
  fetchTemperature()
  fetchHumidity()
}, 2000)

const temperatureCanvasCtx =
document.getElementById('temperature-chart')

const temperatureChartConfig = 
{
type: 'line',
data: {
  labels:[],
  datasets: [{
   data:[],
   backgroundColor: 'rgba(255, 204, 211, 0.55)'
   }]
},
options: {
  legend: 
  { display: false},
  responsive:true,
  maintainAspectRatio: false,
  scales: {
   yAxes: [{

    ticks: {
       suggestedMin:10,
       suggestedMax:50
           }
        }]
      }
    }
 }
const temperatureChart = new Chart(temperatureCanvasCtx,
temperatureChartConfig)
 
const humidityCanvasCtx = 
document.getElementById('humidity-chart')

const humidityChartConfig = 
{
 type: 'line',
 data: {
   labels: [],
   datasets: [{
      data:[],
      backgroundColor: 'rgba(198, 100, 235, 0.55)'
}]
},
options: {
  legend: {display:false},
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks:{
      suggestedMin: 30,
      suggestedMax: 90
             }
            }]
           }
         }
       }
const humidityChart = new Chart(humidityCanvasCtx,
humidityChartConfig)

const pushData = (arr, value, maxLen) => {
  arr.push(value)
  if (arr.length > maxLen){
    arr.shift()
}
}
 

