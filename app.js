let dataPoints=[]
let currentType="surat"

const ctx=document.getElementById('chart').getContext('2d')

const chart=new Chart(ctx,{
type:'scatter',
data:{
datasets:[{
label:'Sürat (m/s)',
data:dataPoints,
borderWidth:2,
showLine:true,
tension:0.3,
pointRadius:5
}]
},
options:{
scales:{
x:{type:'linear',title:{display:true,text:'Zaman'}},
y:{title:{display:true,text:'Sürat'}}
},
plugins:{
zoom:{
pan:{enabled:true,mode:'xy'},
zoom:{
wheel:{enabled:true},
pinch:{enabled:true},
mode:'xy'
}
}
}
}
})

function convertData(){
if(currentType==="surat") return dataPoints

if(currentType==="konum"){
let r=[]
let toplam=0
for(let i=0;i<dataPoints.length;i++){
if(i>0){
let dt=dataPoints[i].x-dataPoints[i-1].x
let ort=(dataPoints[i].y+dataPoints[i-1].y)/2
toplam+=ort*dt
}
r.push({x:dataPoints[i].x,y:toplam})
}
return r
}

if(currentType==="ivme"){
let r=[]
for(let i=1;i<dataPoints.length;i++){
let dt=dataPoints[i].x-dataPoints[i-1].x
let dv=dataPoints[i].y-dataPoints[i-1].y
r.push({x:dataPoints[i].x,y:dv/dt})
}
return r
}
}

function updateChart(){
if(currentType==="surat"){
chart.data.datasets[0].label="Sürat (m/s)"
chart.options.scales.y.title.text="Sürat (m/s)"
document.getElementById("title").innerText="Sürat - Zaman Grafiği"
}

if(currentType==="konum"){
chart.data.datasets[0].label="Konum (m)"
chart.options.scales.y.title.text="Konum (m)"
document.getElementById("title").innerText="Konum - Zaman Grafiği"
}

if(currentType==="ivme"){
chart.data.datasets[0].label="İvme (m/s²)"
chart.options.scales.y.title.text="İvme (m/s²)"
document.getElementById("title").innerText="İvme - Zaman Grafiği"
}

chart.data.datasets[0].data=convertData()
chart.update()
}

function addData(){
const t=parseFloat(document.getElementById('time').value)
const s=parseFloat(document.getElementById('speed').value)
if(isNaN(t)||isNaN(s))return

dataPoints.push({x:t,y:s})
dataPoints.sort((a,b)=>a.x-b.x)

updateChart()

document.getElementById('time').value=''
document.getElementById('speed').value=''
}

function clearData(){
dataPoints=[]
updateChart()
}

function showPage(p){
currentType=p
updateChart()
}
