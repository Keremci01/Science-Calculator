let dataPoints = []
let currentType = "surat"

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

function convertData() {
    if (currentType === "surat") return dataPoints

    if (currentType === "konum") {
        let result = []
        let toplam = 0

        for (let i = 0; i < dataPoints.length; i++) {
            if (i > 0) {
                let dt = dataPoints[i].x - dataPoints[i - 1].x
                let ort = (dataPoints[i].y + dataPoints[i - 1].y) / 2
                toplam += ort * dt
            }
            result.push({ x: dataPoints[i].x, y: toplam })
        }

        return result
    }

    if (currentType === "ivme") {
        let result = []

        for (let i = 1; i < dataPoints.length; i++) {
            let dt = dataPoints[i].x - dataPoints[i - 1].x
            let dv = dataPoints[i].y - dataPoints[i - 1].y
            result.push({ x: dataPoints[i].x, y: dv / dt })
        }

        return result
    }
}

function updateChartType() {
    if (currentType === "surat") {
        chart.data.datasets[0].label = "Sürat (m/s)"
        chart.options.scales.y.title.text = "Sürat (m/s)"
    }

    if (currentType === "konum") {
        chart.data.datasets[0].label = "Konum (m)"
        chart.options.scales.y.title.text = "Konum (m)"
    }

    if (currentType === "ivme") {
        chart.data.datasets[0].label = "İvme (m/s²)"
        chart.options.scales.y.title.text = "İvme (m/s²)"
    }

    chart.data.datasets[0].data = convertData()
    chart.update()
}

function updateTitle() {
    if (currentType === "surat") {
        document.getElementById("title").innerText = "Sürat - Zaman Grafiği"
    }

    if (currentType === "konum") {
        document.getElementById("title").innerText = "Konum - Zaman Grafiği"
    }

    if (currentType === "ivme") {
        document.getElementById("title").innerText = "İvme - Zaman Grafiği"
    }
}

function addData() {
    const time = parseFloat(document.getElementById('time').value)
    const speed = parseFloat(document.getElementById('speed').value)

    if (isNaN(time) || isNaN(speed)) return

    dataPoints.push({ x: time, y: speed })
    dataPoints.sort((a, b) => a.x - b.x)

    chart.data.datasets[0].data = convertData()
    chart.update()

    document.getElementById('time').value = ''
    document.getElementById('speed').value = ''
}

function clearData() {
    dataPoints.length = 0
    chart.data.datasets[0].data = []
    chart.update()
}

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active')
}

function toggleGroup(id) {
    document.getElementById(id).classList.toggle('active')
}

function showPage(page) {
    currentType = page
    updateChartType()
    updateTitle()
    document.getElementById('sidebar').classList.remove('active')
}
