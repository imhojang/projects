var hours = 0;
var mins = 0;
var secs = 0;
var msecs = 0;
var stopwatch = document.getElementById('stopwatch');
var startbtn = document.getElementById('start');
var logbtn = document.getElementById('log');
var t;
var animate = false;

stopwatch.innerHTML= pad(mins) + ":" + pad(secs) + "." + pad(msecs);


function start() {
  if (animate == false) {
    t = setInterval(time,10);
    startbtn.innerHTML="stop";
    logbtn.innerHTML="lap";
    startbtn.removeEventListener("click",time);
    animate = true;
    startbtn.style.backgroundColor = "red";
  }
  else if (animate == true) {
    stop();
    logbtn.innerHTML="reset";
    animate = false;
  }
}
function stop() {
  clearInterval(t);
  animate = false;
  startbtn.innerHTML="continue";
  startbtn.style.backgroundColor = "#4CAF50";
}

function time() {
  msecs++;
  if(msecs>99) {msecs=0; secs++;}
  if(secs>59) {secs=0; mins++;}
  if(mins>59) {mins=0; done();}

  stopwatch.innerHTML= pad(mins) + ":" + pad(secs) + "." + pad(msecs);

}

function done() {
  alert("maximum hours reached. please reset the time.");
  stop(); startbtn.innerHTML="start";
}

var n = 0;

function log() {
  if(animate){
    n++;
    timelog.innerHTML = timelog.innerHTML  + `Lap ${n}` + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"  + stopwatch.innerHTML + "<br />";
  }
  else if(!animate){
    msecs = 0;
    secs = 0;
    mins = 0;
    hours = 0;
    startbtn.innerHTML="start";
    logbtn.innerHTML="lap";
    stopwatch.innerHTML= pad(mins) + ":" + pad(secs) + "." + pad(msecs);
    timelog.innerHTML= "";
    n = 0;
  }
}

  function pad(unit) {
    if(String(unit).length<2) return "0"+unit;
    else return unit;
  }
