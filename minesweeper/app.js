var tbody = document.querySelector("#table tbody");
var dataset = [];
var stopFlag = false;
var openCell = 0;
var myTimer;
var cellType = {
  opened: -1,
  notSure: -2,
  flag: -3,
  flagMine: -4,
  notSureMine: -5,
  mine: 1,
  normal: 0,
};
var hor = 10,
  ver = 10,
  mine = 10;

makeGame();

document.getElementById("easy").addEventListener("click", function() {
  hor = 10;
  ver = 10;
  mine = 10;
  makeGame();
});
document.getElementById("normal").addEventListener("click", function() {
  hor = 15;
  ver = 15;
  mine = 40;
  makeGame();
});
document.getElementById("hard").addEventListener("click", function() {
  hor = 20;
  ver = 20;
  mine = 100;
  makeGame();
});

function makeGame() {
  count = 0;
  clearInterval(myTimer);
  updateTime();
  tbody.innerHTML = "";
  document.querySelector("#result").textContent = "";
  dataset = [];
  stopFlag = false;
  openCell = 0;


  // random mine location
  // Array().fill().map() 3 combo to create an array of numbers
  var candidates = Array(hor * ver)
    .fill()
    .map(function(item, index) {
      return index;
    });
    
  //fisher yates shuffle to shuffle the numbers in array created above
  var shuffle = [];
  while (candidates.length > hor * ver - mine) {
    var tempVal = candidates.splice(
      Math.floor(Math.random() * candidates.length),
      1
    )[0];
    shuffle.push(tempVal);
  }

  // initializing mine table
  for (let i = 0; i < ver; i++) {
    var arr = [];
    dataset.push(arr);
    var tr = document.createElement("TR");
    for (let j = 0; j < hor; j++) {
      arr.push(cellType.normal);
      var td = document.createElement("TD");
      td.addEventListener("contextmenu", function(e) {
        if (stopFlag === true) {
          stopTimer();
          return;
        }
        e.preventDefault();
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var $col = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        var $row = Array.prototype.indexOf.call(parentTbody.children, parentTr);
        if (
          e.currentTarget.textContent === "" ||
          dataset[$row][$col] === cellType.mine
        ) {
          e.currentTarget.textContent = "!";
          e.currentTarget.classList.remove("question");
          e.currentTarget.classList.add("flag");
          if (dataset[$row][$col] === cellType.mine) {
            dataset[$row][$col] = cellType.flagMine;
          } else {
            dataset[$row][$col] = cellType.flag;
          }
        } else if (e.currentTarget.textContent === "!") {
          e.currentTarget.textContent = "?";
          e.currentTarget.classList.remove("flag");
          e.currentTarget.classList.add("question");
          if (dataset[$row][$col] === cellType.flagMine) {
            dataset[$row][$col] = cellType.notSureMine;
          } else {
            dataset[$row][$col] = cellType.notSure;
          }
        } else if (e.currentTarget.textContent === "?") {
          e.currentTarget.classList.remove("question");
          if (dataset[$row][$col] === cellType.notSureMine) {
            e.currentTarget.textContent = "";
            dataset[$row][$col] = cellType.mine;
          } else {
            e.currentTarget.textContent = "";
            dataset[$row][$col] = cellType.normal;
          }
        }
      });
      td.addEventListener("click", function(e) {
        if (stopFlag === true) {
          stopTimer();
          return;
        }
        var parentTr = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var $col = Array.prototype.indexOf.call(
          parentTr.children,
          e.currentTarget
        );
        var $row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

        if (
          [cellType.opened, cellType.flagMine, cellType.notSureMine].includes(
            dataset[$row][$col]
          )
        ) {
          return ;
        }

        // number of mines around on click
        e.currentTarget.classList.add("opened");
        openCell++;
        if (dataset[$row][$col] === cellType.mine) {
          document.querySelectorAll(".mineClass").forEach(function(v) {
            v.style.background = `url('sprite100.gif') -64px -39px`;
          });
          document.querySelectorAll(".mineClass.flag").forEach(function(v) {
            v.style.background = `url('sprite100.gif') -48px -39px`;
          });
          e.currentTarget.style.background = `url('sprite100.gif') -32px -39px`;
          stopTimer();
          document.querySelector("#result").innerHTML = "Game over. Try again.";
          stopFlag = true;
          return;
        } else {
          dataset[$row][$col] = 1;
          var aroundArr = [dataset[$row][$col - 1], dataset[$row][$col + 1]];
          if (dataset[$row - 1]) {
            aroundArr = aroundArr.concat([
              dataset[$row - 1][$col - 1],
              dataset[$row - 1][$col],
              dataset[$row - 1][$col + 1],
            ]);
          }
          if (dataset[$row + 1]) {
            aroundArr = aroundArr.concat([
              dataset[$row + 1][$col - 1],
              dataset[$row + 1][$col],
              dataset[$row + 1][$col + 1],
            ]);
          }

          var numMines = aroundArr.filter(function(v) {
            return [
              cellType.mine,
              cellType.flagMine,
              cellType.notSureMine,
            ].includes(v);
          }).length;

          var eachNumberWidth = -16;
          e.currentTarget.style.background = `url('sprite100.gif') ${eachNumberWidth *
            numMines}px -23px`;
            dataset[$row][$col] = cellType.opened;
            // number of mines. blank if 0
          if (numMines === 0) {
            // open 8 blanks around
            var surroundArr = [];
            if (tbody.children[$row - 1]) {
              surroundArr = surroundArr.concat([
                tbody.children[$row - 1].children[$col - 1],
                tbody.children[$row - 1].children[$col],
                tbody.children[$row - 1].children[$col + 1],
              ]);
            }
            surroundArr = surroundArr.concat([
              tbody.children[$row].children[$col - 1],
              tbody.children[$row].children[$col + 1],
            ]);
            if (tbody.children[$row + 1]) {
              surroundArr = surroundArr.concat([
                tbody.children[$row + 1].children[$col - 1],
                tbody.children[$row + 1].children[$col],
                tbody.children[$row + 1].children[$col + 1],
              ]);
            }
            surroundArr
              .filter(function(v) {
                return !!v; // removes undefined values (undefined) -> (true) -> (false)
              })
              .forEach(function(surrBlank) {
                var parentTr = surrBlank.parentNode;
                var parentTbody = surrBlank.parentNode.parentNode;
                var surrCol = Array.prototype.indexOf.call(
                  parentTr.children,
                  surrBlank
                );
                var surrRow = Array.prototype.indexOf.call(
                  parentTbody.children,
                  parentTr
                );

                if (dataset[surrRow][surrCol] !== cellType.opened) {
                  surrBlank.click();
                }
              });
          }
        }
        if (openCell === hor * ver - mine) {
          stopFlag = true;
          stopTimer();
          document.querySelectorAll(".mineClass").forEach(function(v) {
            v.style.background = `url('sprite100.gif') -48px -39px`;
          });
          document.querySelector("#result").innerHTML =
            "Congratulations. You've won." + "<br>" + `Score: ${count}`;
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
    tbody.addEventListener("click", handler);
  }

  // planting mines
  for (var k = 0; k < shuffle.length; k++) {
    // 63
    var row = Math.floor(shuffle[k] / ver); // 5
    var col = shuffle[k] % ver; // 2
    tbody.children[row].children[col].classList.add("mineClass");
    dataset[row][col] = cellType.mine;
  }
  // console.log(dataset);
}

function handler() {
  tbody.removeEventListener("click", handler);
  myTimer = setInterval(timer, 1000);
}

function timer() {
  count++;
  updateTime();
}

function updateTime() {
  document.querySelector(
    ".one"
  ).style.background = `url('sprite100.gif') -${13 * (count % 10)}px 0px`;
 
  document.querySelector(
    ".two"
  ).style.background = `url('sprite100.gif') -${13 *
    Math.floor( (count- Math.floor(count/100)*100) / 10)}px 0px`;    

  document.querySelector(
    ".three"
  ).style.background = `url('sprite100.gif') -${13 *
    Math.floor(count / 100)}px 0px`;
}

function stopTimer() {
  clearInterval(myTimer);
}
