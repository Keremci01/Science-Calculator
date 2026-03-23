let dataPoints = []

const ctx = document.getElementById('chart').getContext('2d')

const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Sürat (m/s)',
            data: dataPoints,
            borderWidth: 2,
            showLine: true,
            tension: 0.3,
            pointRadius: 5
        }]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0,
                max: 60,
                ticks: {
                    stepSize: 10
                },
                title: {
                    display: true,
                    text: 'Zaman (s)'
                }
            },
            y: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 10
                },
                title: {
                    display: true,
                    text: 'Sürat (m/s)'
                }
            }
        }
    }
})

function addData() {
    const time = parseFloat(document.getElementById('time').value)
    const speed = parseFloat(document.getElementById('speed').value)

    if (isNaN(time) || isNaN(speed)) return

    dataPoints.push({ x: time, y: speed })

    dataPoints.sort((a, b) => a.x - b.x)

    chart.update()

    document.getElementById('time').value = ''
    document.getElementById('speed').value = ''
}

function clearData() {
    dataPoints.length = 0
    chart.update()
}
