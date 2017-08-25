var boxGreen = document.getElementById("boxGreen");
var boxRed = document.getElementById("boxRed");
var boxYellow = document.getElementById("boxYellow");
var boxBlue = document.getElementById("boxBlue");
var boxSet = [boxGreen, boxRed, boxYellow, boxBlue];
var audioGreen = document.getElementById("audioGreen");
var audioRed = document.getElementById("audioRed");
var audioYellow = document.getElementById("audioYellow");
var audioBlue = document.getElementById("audioBlue");
var resetBtn = document.getElementById("reset");
var strictBtn = document.getElementById("strict");
var roundBtn = document.getElementById("round");
var pattern = [];
var currentPattern = [];
var userPattern = [];
var sound;
var strictToggle = 0;
var roundCount = 1;

audioGreen.preload = 'auto';
audioRed.preload = 'auto';
audioYellow.preload = 'auto';
audioBlue.preload = 'auto';

function reset() {
  alert("Ok let's play again!")
  roundCount = 1;
  makePattern();
  currentPattern = [];
  roundBtn.innerHTML = "ROUND: " + roundCount;
  playPattern(1);
}

function win() {
  alert("Congratulations! You win!");
  reset();
}

function soundMatch(testObj) {
  if (testObj == boxGreen) {
    sound = audioGreen;
  } else if (testObj == boxRed) {
    sound = audioRed;
  } else if (testObj == boxYellow) {
    sound = audioYellow;
  } else if (testObj == boxBlue) {
    sound = audioBlue;
  }
}

function simonSays(obj){
  if (typeof obj == "string") {
    obj = document.getElementById(obj);
  }
  soundMatch(obj);
  if (sound.paused) {
    sound.play();
  }else{
    sound.currentTime = 0
  }
  obj.style.opacity = '0.5';
  setTimeout(function(){
    obj.style.opacity = "1";
  }, 200);
}

function makePattern() {
  pattern = [];
  userPattern = [];
  for (var i = 0; i < 20; i++) {
    var nextBox = boxSet[Math.floor(Math.random()*boxSet.length)].id;
    pattern.push(nextBox);
  }
}

function nextPlayFunc(nextNum) {
  return roundCount - nextNum;
}

function playPattern (num) {
  setTimeout(function () {
    roundBtn.innerHTML = "ROUND: " + roundCount;
    var nextPlay = pattern[nextPlayFunc(num)];
    simonSays(nextPlay);
    currentPattern.push(nextPlay);
    if (--num) {
      playPattern(num);
    }
  }, 800);
}

function testPattern() {
  if (userPattern.length == currentPattern.length) {
    var incorrect = 0;
    for (var i = 0; i < userPattern.length; i++) {
      if (userPattern[i] != currentPattern[i]) {
        incorrect++;
      }
    }
    if (incorrect == 0 && roundCount < 20) {
      setTimeout(function() { alert("Correct!"); }, 600);
      userPattern = [];
      incorrect = 0;
      currentPattern = [];
      roundCount++;
      playPattern(roundCount);
    } else if (incorrect == 0 && roundCount == 20) {
      win();
    } else if (incorrect > 0) {
      setTimeout(function() { alert("Incorrect!"); }, 600);
      userPattern = [];
      incorrect = 0;
      currentPattern = [];
      playPattern(roundCount);
    }
  }
}

function testPatternStrict() {
  if (userPattern.length == currentPattern.length) {
    var incorrect = 0;
    for (var i = 0; i < userPattern.length; i++) {
      if (userPattern[i] != currentPattern[i]) {
        incorrect++;
      }
    }
    if (incorrect == 0 && roundCount < 20) {
      setTimeout(function() { alert("Correct!"); }, 600);
      userPattern = [];
      incorrect = 0;
      currentPattern = [];
      roundCount++;
      playPattern(roundCount);
    } else if (incorrect == 0 && roundCount == 20) {
      win();
    } else if (incorrect > 0) {
      setTimeout(function() { alert("Sorry! You have to start over!"); }, 600);
      userPattern = [];
      incorrect = 0;
      currentPattern = [];
      setTimeout(function() { reset() }, 700);
    }
  }
}

boxGreen.onclick = function(){
  simonSays(this);
  userPattern.push("boxGreen");
  if (strictToggle == 0) {
    testPattern();
  } else if (strictToggle == 1) {
    testPatternStrict();
  }
};
boxRed.onclick = function(){
  simonSays(this);
  userPattern.push("boxRed");
  if (strictToggle == 0) {
    testPattern();
  } else if (strictToggle == 1) {
    testPatternStrict();
  }
};
boxYellow.onclick = function(){
  simonSays(this);
  userPattern.push("boxYellow");
  if (strictToggle == 0) {
    testPattern();
  } else if (strictToggle == 1) {
    testPatternStrict();
  }
};
boxBlue.onclick = function(){
  simonSays(this);
  userPattern.push("boxBlue");
  if (strictToggle == 0) {
    testPattern();
  } else if (strictToggle == 1) {
    testPatternStrict();
  }
};

resetBtn.onclick = function(){reset()};

strictBtn.onclick = function(){
  if (strictToggle == 0) {
    strictToggle = 1;
    strictBtn.innerHTML = "STRICT MODE ON";
  } else if (strictToggle == 1) {
    strictToggle = 0;
    strictBtn.innerHTML = "STRICT MODE OFF";
  }
  reset();
};

roundBtn.onclick = function(){
  reset();
};
