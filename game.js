let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let index = 0;
let result = true;

function nextSequence(index, userClickedPattern) {
  let randomNumber = Math.floor(Math.random() * 3 + 1);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  $("h1").text("Level " + level);

  level++;
  if (result === false) {
    alert("GAME OVER");
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour); // Call animatePress function
  index++;
  setTimeout(function () {
    nextSequence();
  }, 1000); // 2000 milliseconds = 2 seconds
  if (index === level && level != 0 && index != 0) {
    result = checkAnswer(index, gamePattern, userClickedPattern);
  }
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  setTimeout(function () {
    nextSequence(0);
  }, 1000); // 2000 milliseconds = 2 seconds
});

function checkAnswer(index, gamePattern, userClickedPattern) {
  for (let i = 0; i <= index; i++) {
    console.log(gamePattern[i]);
    console.log(userClickedPattern[i]);

    if (gamePattern[i] != userClickedPattern[i]) {
      return false;
    }
  }
  index = 0;
  return true;
}
