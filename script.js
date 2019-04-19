var ss = 0;
var mm = 0;
var hh = 0;
var ampm;

var hhUpbtn = document.getElementById('hhUp');
var mmUpbtn = document.getElementById('mmUp');
var myclock = document.getElementById('myclock');
var startbtn = document.getElementById('start');
var ampmbtn = document.getElementById('AM-PM');

hhUpbtn.addEventListener("click",incH);
mmUpbtn.addEventListener("click",incM);
startbtn.addEventListener("click",start)
ampmbtn.addEventListener("click",ampmTime)


dispTime();

function start() {
  setInterval(time,1000);
}

function timeRules () {
  if(ss>59)  {ss=0; mm++;}
  if(mm>59)  {mm=0; hh++;}
  if(hh>23) {hh=0;}
}

function time() {
  ss++;
  timeRules();
  dispTime();
  if(ampm != undefined) ampmTime();
}

function incM() {
  mm++;
  timeRules();
  dispTime();
  if(ampm) ampmTime();
}

function incH() {
  hh++;
  timeRules();
  dispTime();
  if(ampm) ampmTime();
}

function dispTime() {
  if(ampm == undefined) myclock.innerHTML = padZ(hh) + ":" + padZ(mm) + ":" + padZ(ss);
  else myclock.innerHTML = padZ(hh) + ":" + padZ(mm) + ":" + padZ(ss) + " " + ampm;
}


function padZ(unit) {
  if(String(unit).length<2) return "0"+unit;
  else return unit;
}
var ampmArr = ["A.M.","P.M."];
var x = 0;
var c = "change";
//시계는 오전 11시 59분 이 지나면 오후 12시 00 분 이 된다
//그리고 오후 11시 59분이 지나면 오전 12시 00 분 이 된다. 이부분은 해결함.
function ampmTime() {
  if (hh==11){ c = "change";}
  if (hh>11 && ampm == undefined){if(hh>12){ hh= hh-12;} x = 1}
  else if (hh=<12 && ampm == undefined){x=0}
  else if (hh>11) { if(c=="change") {ampm = ampmArr[x]; x= (x+1)%2; c = "";} }
  if (hh>12) {hh = hh-12;}
  ampm = ampmArr[x];
  dispTime();
}



/*---------------------------------------------------------------*/
