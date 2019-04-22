var months = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"]
var ampmMode = false;
var bli = true;
var day = true;

document.getElementById('AMPMbtn').addEventListener("click",ampmbtn);
document.getElementById('DNbtn').addEventListener("click",dayOrNight);

function currTime() {
  var today = new Date();
  var date = months[today.getMonth()] + " " + today.getDate() + " " + today.getFullYear() ;
  var hh = today.getHours();
  var mm = today.getMinutes();
  var ss = today.getSeconds();
  var ampm = hh>11 && today.getHours()<24 ? "P.M." : "A.M.";

  if(ampmMode==true){
    document.getElementById("AMPM").innerHTML = ampm;
    if(hh>12){
    hh = hh-12;
    }
  }
  else if (ampmMode == false) {
    document.getElementById("AMPM").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    hh = today.getHours();
  }

  var time = zeroPad(hh) + ":" + zeroPad(mm) + ":" + zeroPad(ss);

  document.getElementById('myclock').innerHTML = time;
  document.getElementById('mydate').innerHTML = date + "</br>" + "&nbsp;";

}

function zeroPad(unit) {
  if(unit.toString().length <2) {
    return "0"+unit;
  }
  else {
    return unit;
  }
}

function blink() {
  if(bli==true) {
    document.getElementById('mydate').style.color = "green";
    document.getElementById('AMPM').style.color = "green";
    bli = false;
  }
  else {
    document.getElementById('AMPM').style.color = "#153d05";
    document.getElementById('mydate').style.color = "#153d05";
    bli = true;
  }
}

function ampmbtn () {
  if(ampmMode == false) {
    ampmMode = true;
  }
  else if (ampmMode ==true) {
    ampmMode = false;
  }
}

function dayOrNight () {
  if (day == true) {
    document.body.style.backgroundColor = "white";
    day = false;
  }
  else if (day == false) {
    document.body.style.backgroundColor = "black";
    day = true;
  }
}

setInterval(blink,1000);
setInterval(currTime, 100);
