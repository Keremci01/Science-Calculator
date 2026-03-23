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
            pointRadius: 5,
            borderColor:'#3b82f6',
            backgroundColor:'rgba(59,130,246,0.3)',
            fill:true
        }]
    },
    options: {
        interaction:{
            mode:'nearest',
            intersect:false
        },
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
        },
        plugins: {
            tooltip:{
                callbacks:{
                    label:(ctx)=>"("+ctx.parsed.x+" , "+ctx.parsed.y+")"
                }
            },
            zoom: {
                pan: { enabled: true, mode: 'xy', modifierKey: null },
                zoom: {
                    wheel: { enabled: true },
                    pinch: { enabled: true },
                    mode: 'xy'
                }
            }
        }
    }
})

function getAnalysisData(type){
let result=[]

if(type==="artan"){
for(let i=0;i<50;i++){
result.push({x:i,y:i})
}
}

if(type==="sabit"){
for(let i=0;i<50;i++){
result.push({x:i,y:20})
}
}

if(type==="yorum"){
for(let i=0;i<50;i++){
result.push({x:i,y:Math.sin(i/5)*20+30})
}
}

return result
}

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

    if(page==="surat"||page==="konum"||page==="ivme"){
        updateChartType()
        updateTitle()
        chart.data.datasets[0].data = convertData()
    }

    if(page==="artan"){
        document.getElementById("title").innerText="Artan Grafik"
        chart.data.datasets[0].label="Artan"
        chart.data.datasets[0].data=getAnalysisData("artan")
    }

    if(page==="sabit"){
        document.getElementById("title").innerText="Sabit Grafik"
        chart.data.datasets[0].label="Sabit"
        chart.data.datasets[0].data=getAnalysisData("sabit")
    }

    if(page==="yorum"){
        document.getElementById("title").innerText="Yorumlama Grafiği"
        chart.data.datasets[0].label="Yorum"
        chart.data.datasets[0].data=getAnalysisData("yorum")
    }

    chart.update()
    document.getElementById('sidebar').classList.remove('active')
}
