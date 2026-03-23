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
                min: 0,
                max: 60,
                ticks: { stepSize: 10 },
                title: { display: true, text: 'Zaman (s)' }
            },
            y: {
                min: 0,
                max: 100,
                ticks: { stepSize: 10 },
                title: { display: true, text: 'Sürat (m/s)' }
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

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active')
}

function toggleGroup(id) {
    document.getElementById(id).classList.toggle('active')
}

function showPage(page) {
    document.getElementById('suratPage').style.display = 'none'
    document.getElementById('konumPage').style.display = 'none'
    document.getElementById('ivmePage').style.display = 'none'

    if (page === 'surat') {
        document.getElementById('suratPage').style.display = 'block'
    }

    if (page === 'konum') {
        document.getElementById('konumPage').style.display = 'block'
    }

    if (page === 'ivme') {
        document.getElementById('ivmePage').style.display = 'block'
    }

    document.getElementById('sidebar').classList.remove('active')
}
