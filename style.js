let times = []
let speeds = []

const ctx = document.getElementById('chart').getContext('2d')

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: times,
        datasets: [{
            label: 'Sürat (m/s)',
            data: speeds,
            borderWidth: 2,
            tension: 0.3
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Zaman (s)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Sürat (m/s)'
                }
            }
        }
    }
})

function addData() {
    const time = document.getElementById('time').value
    const speed = document.getElementById('speed').value

    if(time === '' || speed === '') return

    times.push(time)
    speeds.push(speed)

    chart.update()

    document.getElementById('time').value = ''
    document.getElementById('speed').value = ''
}

function clearData() {
    times.length = 0
    speeds.length = 0
    chart.update()
}
