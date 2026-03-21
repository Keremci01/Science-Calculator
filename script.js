let z=1;

function openWindow(type){

let win=document.createElement("div");
win.className="window";
win.style.top="100px";
win.style.left="200px";
win.style.zIndex=z++;

let title=document.createElement("div");
title.className="titlebar";

title.innerHTML = type.toUpperCase() + 
"<span class='close'>X</span>";

let content=document.createElement("div");
content.className="content";

if(type==="console"){
content.innerHTML="> system ready<br>> type commands...";
}

if(type==="cracker"){
content.innerHTML="TARGET: ********<br><br>[########----]";
}

win.appendChild(title);
win.appendChild(content);
document.body.appendChild(win);

title.querySelector(".close").onclick=()=>{
win.remove();
};

let offsetX,offsetY,drag=false;

title.onmousedown=(e)=>{
drag=true;
offsetX=e.clientX - win.offsetLeft;
offsetY=e.clientY - win.offsetTop;
};

document.onmouseup=()=>drag=false;

document.onmousemove=(e)=>{
if(drag){
win.style.left=(e.clientX-offsetX)+"px";
win.style.top=(e.clientY-offsetY)+"px";
}
};

}
