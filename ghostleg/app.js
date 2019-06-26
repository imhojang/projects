var decBtn = document.getElementById("decBtn");
var incBtn = document.getElementById("incBtn");
var playerText = document.getElementById("playerText");
var numPlayers = document.getElementById("numPlayers").textContent;
var playBtn = document.getElementById("startBtn");
var engBtn = document.getElementById("engLang");
var $canvas = document.getElementById("canvas");
var $canvasContainer = document.getElementById("canvasContainer");
var $resultContainer = document.getElementById("resultContainer");
var title = document.querySelector("h1");
var koreanBtn = document.getElementById("korLang");
var resultBtn = document.getElementById("resultBtn");
var resultsDisplayed = numPlayers;
var inputWidth = 100;
var inputHeight = 25;
var inputPlayerNameArr = [];
var inputTargetNameArr = [];
var nextBtn = document.createElement("BUTTON");
var yValue;

nextBtn.textContent = "NEXT";
$canvasContainer.style.display = "none";
decBtn.addEventListener("click", decNumPlayers);
incBtn.addEventListener("click", incNumPlayers);
playBtn.addEventListener("click", inputScreen);
title.addEventListener("click", function() {
  window.location.reload();
});
engBtn.addEventListener("click", function() {
  window.location.reload();
});
koreanBtn.addEventListener("click", changeLangToKorean);

function changeLangToKorean() {
  title.textContent = "사다리타기";
  decBtn.textContent = "빼기!";
  incBtn.textContent = "더하기!";
  playerText.textContent = "플레이어";
  playerText.style.display = "block";
  playBtn.textContent = "시작";
  engBtn.textContent = "English";
  koreanBtn.textContent = "한국어";
  resultBtn.textContent = "결과 보기";
  nextBtn.textContent = "다음";
}

function addClickEventToInputs() {
  for (let i = 0; i < document.getElementsByClassName("player").length; i++) {
    document
      .getElementsByClassName("player")
      [i].addEventListener("click", drawThisOne);
  }
}

function drawThisOne(event) {
  let { result, color } = drawGhostLegs(event.target.id);
  if (resultsDisplayed > 0) {
    addToResult(event, result, color);
    resultsDisplayed--;
  }
}

function resultBtnFxn() {
  document.querySelectorAll(".player").forEach(function(v) {
    v.click();
  });
  resultBtn.parentElement.removeChild(resultBtn);
  $resultContainer.style.display = "block";
  drawBaseLine();
  alert(`Scroll down to see your result\n페이지 하단의 결과를 확인하세요`);
}

function addToResult(event, result, color) {
  let resultString = `${event.target.value} ⇒ ${result}`;
  let resultBox = document.createElement("P");
  resultBox.textContent = resultString;
  resultBox.style.backgroundColor = color;
  $resultContainer.appendChild(resultBox);
}

function inputScreen() {
  autoSetCanvasSize();
  document
    .querySelector("body")
    .removeChild(document.getElementById("initBtns"));
  showInputs();
  drawVerticalLines();
  addNextButton();
}

function readOnlyInput() {
  for (let i = 0; i < document.getElementsByClassName("inputBox").length; i++) {
    document.getElementsByClassName("inputBox")[i].readOnly = true;
    if (i < numPlayers) {
      document.getElementsByClassName("player")[i].style.cursor = "pointer";
      document.getElementsByClassName("target")[i].style.cursor = "default";
    }
  }
}

function addNextButton() {
  var proceedOrNot = false;
  nextBtn.className = "nextBtn";
  $canvasContainer.appendChild(nextBtn);
  nextBtn.addEventListener("click", function() {
    proceedOrNot = true;
    for (let i = 0; i < document.querySelectorAll("INPUT").length; i++) {
      if (document.querySelectorAll("INPUT")[i].value === "") {
        proceedOrNot = false;
      }
    }
    if (proceedOrNot === false) {
      alert(`fill in the blank(s)\n빈칸을 입력해주세요`);
    } else {
      drawBaseLine();
      addClickEventToInputs();
      readOnlyInput();
      $canvasContainer.removeChild(nextBtn);
      resultBtn.style.display = "block";
      resultBtn.addEventListener("click", resultBtnFxn);
    }
  });
}

function showInputs() {
  var $canvasLeft = $canvas.offsetLeft;
  var $canvasTop = $canvas.offsetTop;

  // create input Buttons
  for (let i = 0; i < numPlayers; i++) {
    inputPlayerNameArr[i] = document.createElement("INPUT");
    inputPlayerNameArr[i].type = "text";
    inputPlayerNameArr[i].className = "inputBox player";
    inputPlayerNameArr[i].id = `line${i}`;
    inputPlayerNameArr[i].style.position = "absolute";
    inputPlayerNameArr[i].style.left = `${$canvasLeft + i * 150}px`;
    inputPlayerNameArr[i].style.top = `${$canvasTop + 20}px`;
    inputPlayerNameArr[i].style.height = inputHeight + "px";
    inputPlayerNameArr[i].style.width = inputWidth + "px";

    $canvasContainer.appendChild(inputPlayerNameArr[i]);
  }
  for (let i = 0; i < numPlayers; i++) {
    inputTargetNameArr[i] = document.createElement("INPUT");
    inputTargetNameArr[i].type = "text";
    inputTargetNameArr[i].className = "inputBox target";
    inputTargetNameArr[i].style.position = "absolute";
    inputTargetNameArr[i].style.left = `${$canvasLeft + i * 150}px`;
    inputTargetNameArr[i].style.top = `${$canvasTop + $canvas.height - 37}px`;
    inputTargetNameArr[i].style.height = inputHeight + "px";
    inputTargetNameArr[i].style.width = inputWidth + "px";

    $canvasContainer.appendChild(inputTargetNameArr[i]);
  }
}

function autoSetCanvasSize() {
  $canvasContainer.style.display = "block";
  $canvas.style.display = "inline-block";
  $canvas.width = +numPlayers * 145;
}

function decNumPlayers() {
  if (+numPlayers > 2) {
    document.getElementById("numPlayers").textContent =
      +document.getElementById("numPlayers").textContent - 1;
    numPlayers = document.getElementById("numPlayers").textContent;
    resultsDisplayed = Number(numPlayers);
  } else {
    alert("You have reached the minimum number of players.");
    document.getElementById("numPlayers").textContent = 2;
    numPlayers = 2;
    resultsDisplayed = Number(numPlayers);
  }
}

function incNumPlayers() {
  if (+numPlayers < 9) {
    document.getElementById("numPlayers").textContent =
      +document.getElementById("numPlayers").textContent + 1;
    numPlayers = document.getElementById("numPlayers").textContent;
    resultsDisplayed = Number(numPlayers);
  } else {
    alert("You have reached the maximum number of players.");
    document.getElementById("numPlayers").textContent = 9;
    numPlayers = 9;
    resultsDisplayed = Number(numPlayers);
  }
}

//----------------draw-------------------------

var initialPointX = 50;
var initialPointY = 50;
var endLineY = 750;
var player = [];
var moveRight = 150;
var moveLeft = -150;
var randomCrossPointArrays = [];
var baseArrays = [];
var numRandomLadders;
var pregamePen = $canvas.getContext("2d");
var clearPen = $canvas.getContext("2d");
var basePen = $canvas.getContext("2d");
var playPen = [];
var lineIdObj = {};
var playersInitialXCoord = {};
var colorArr = [
  "indianred",
  "darkmagenta",
  "mediumslateblue",
  "sandybrown",
  "khaki",
  "dodgerblue",
  "blueviolet",
  "mediumspringgreen",
  "aqua",
];

function setNumLadder() {
  if (numPlayers <= 3) {
    numRandomLadders = 4;
  } else if (numPlayers === 4 && numPlayers === 5) {
    numRandomLadders = 3;
  } else numRandomLadders = 3;
}

function drawVerticalLines() {
  setNumLadder();
  generateRandomCrossPoints();

  pregamePen.beginPath;

  //draw vertical baseline
  for (let i = 0; i < numPlayers; i++) {
    makeLineIdObj(i);
    // create players and initiallize their start point
    player[i] = {};
    player[i].xCoord = initialPointX + i * 150;
    player[i].yCoord = initialPointY;
    playersInitialXCoord[`player[${i}]`] = initialPointX + i * 150;

    pregamePen.moveTo(player[i].xCoord, player[i].yCoord);
    pregamePen.lineTo(player[i].xCoord, endLineY);
  }

  pregamePen.strokeStyle = "#D3D3D3";
  pregamePen.lineWidth = 0.5;
  pregamePen.stroke();
}

function makeLineIdObj(i) {
  lineIdObj[`line${i}`] = i;
}

function generateRandomCrossPoints() {
  for (let i = 0; i < numPlayers; i++) {
    if (i < numPlayers - 1) {
      //create randomCrossPointArrays that will store cross points
      if (!randomCrossPointArrays[i]) {
        randomCrossPointArrays[i] = [];
      }
      if (!randomCrossPointArrays[i + 1]) {
        randomCrossPointArrays[i + 1] = [];
      }
      // push random cross points into randomCrossPointArrays from above.
      for (let j = 0; j < numRandomLadders; j++) {
        // randomCrossPoint should be between 125 and 670
        let randomCrossPoints =
          Math.floor(Math.random() * 300 + Math.random() * 300) + 100;
        randomCrossPointArrays[i].push(randomCrossPoints);
        randomCrossPointArrays[i + 1].push(randomCrossPoints);
      }
    }
    randomCrossPointArrays[i] = randomCrossPointArrays[i].sort();
    baseArrays[i] = [...randomCrossPointArrays[i]];
  }
}

function drawBaseLine() {
  basePen.strokeStyle = "#D3D3D3";
  basePen.clearRect(0, 0, $canvas.width, $canvas.height);
  basePen.beginPath();

  //draw vertical baseline
  for (let i = 0; i < numPlayers; i++) {
    player[i].xCoord = initialPointX + i * 150;
    player[i].yCoord = initialPointY;
    basePen.moveTo(player[i].xCoord, player[i].yCoord);
    basePen.lineTo(player[i].xCoord, endLineY);
  }

  //draw horizontal baseline
  for (let i = 0; i < numPlayers - 1; i++) {
    for (let j = 0; j < baseArrays[i][j]; j++) {
      basePen.moveTo(player[i].xCoord, baseArrays[i][j]);
      basePen.lineTo(player[i].xCoord + moveRight, baseArrays[i][j]);
      if (baseArrays[i + 1] !== undefined) {
        baseArrays[i + 1] = baseArrays[i + 1].filter(function(x) {
          return x !== baseArrays[i][j];
        });
      }
    }
  }

  // loop through first array and draw horizontal line from each point
  // filter out the values from the next array if they exist
  basePen.lineWidth = 0.5;
  basePen.stroke();
}

function clearCanvas(pen = clearPen) {
  pen.clearRect(0, 0, $canvas.width, $canvas.height);
}

function drawGhostLegs(lineId) {
  let i = lineIdObj[lineId];

  if ($canvas.getContext) {
    // ---------------setting up the lines--------------
    let lineIndex = i;
    let currentY;
    let firstY = randomCrossPointArrays[i][0];

    playPen[i] = $canvas.getContext("2d");
    clearCanvas(playPen[i]);
    playPen[i].lineWidth = 0.5;
    drawBaseLine();

    playPen[i].beginPath();
    playPen[i].moveTo(player[i].xCoord, player[i].yCoord);

    player[i].yCoord = firstY;
    playPen[i].lineTo(player[i].xCoord, firstY);
    playPen[i].strokeStyle = colorArr[i];

    while (currentY !== player[i].yCoord) {
      currentY = player[i].yCoord;

      if (lineIndex > 0) {
        if (randomCrossPointArrays[lineIndex - 1].includes(player[i].yCoord)) {
          // draw a horizontal line to the left
          player[i].xCoord += moveLeft;
          playPen[i].lineTo(player[i].xCoord, player[i].yCoord);

          lineIndex--;
          // draw a vertical line until the next greatest yvalue in the nextarray
          for (let j = 0; j < randomCrossPointArrays[lineIndex].length; j++) {
            yValue = randomCrossPointArrays[lineIndex][j];
            if (yValue > player[i].yCoord) {
              player[i].yCoord = yValue;
              playPen[i].lineTo(player[i].xCoord, player[i].yCoord);
              j = randomCrossPointArrays[lineIndex].length;
            }
          }
        } else if (lineIndex < numPlayers - 1) {
          if (
            randomCrossPointArrays[lineIndex + 1].includes(player[i].yCoord)
          ) {
            // draw a horizontal line to the right
            player[i].xCoord += moveRight;
            playPen[i].lineTo(player[i].xCoord, player[i].yCoord);

            lineIndex++;
            // draw a vertical line until the next greatest yvalue in the nextarray
            for (let j = 0; j < randomCrossPointArrays[lineIndex].length; j++) {
              yValue = randomCrossPointArrays[lineIndex][j];
              if (yValue > player[i].yCoord) {
                player[i].yCoord = yValue;
                playPen[i].lineTo(player[i].xCoord, player[i].yCoord);
                j = randomCrossPointArrays[lineIndex].length;
              }
            }
          }
        }
      } else if (lineIndex < numPlayers - 1) {
        if (randomCrossPointArrays[lineIndex + 1].includes(player[i].yCoord)) {
          lineIndex++;
          // draw a horizontal line to the right
          player[i].xCoord += moveRight;
          playPen[i].lineTo(player[i].xCoord, player[i].yCoord);

          // draw a vertical line until the next greatest yvalue in the nextarray
          for (let j = 0; j < randomCrossPointArrays[lineIndex].length; j++) {
            yValue = randomCrossPointArrays[lineIndex][j];
            if (yValue > player[i].yCoord) {
              player[i].yCoord = yValue;
              playPen[i].lineTo(player[i].xCoord, player[i].yCoord);
              j = randomCrossPointArrays[lineIndex].length;
            }
          }
        }
      }
    }
    playPen[i].lineTo(player[i].xCoord, endLineY);
    playPen[i].lineWidth = 5;
    playPen[i].stroke();

    return {
      result: document.getElementsByClassName("target")[lineIndex].value,
      color: colorArr[i],
    };
  }
}
