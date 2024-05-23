let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let index = 0;
let result = true;

function nextSequence() {
  console.log("Now called");
  //generates a random move and saves it increase the level
  let randomNumber = Math.floor(Math.random() * 3 + 1);
  let randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  $("h1").text("Level " + level);

  level++;

}



$(".btn").click(function () {
  //check what the user pressed, animate and play sound too
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  index++;
  console.log(level)
  console.log(index)
  if (index === level && level != 0 && index != 0) {
    console.log("Called");
    answer = checkAnswer(index);
    if (answer === true) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    } else {
      gameOver();
    }
  };

});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keydown(function () {
  setTimeout(function () {
    nextSequence();
  }, 1000);
});

function checkAnswer() {
  for (let i = 0; i <= index; i++) {
    console.log(gamePattern[i]);
    console.log(userClickedPattern[i]);
    if (gamePattern[i] != userClickedPattern[i]) {
      return false;
    }
  }
  index = 0;
  userClickedPattern.length = 0;
  return true;
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function gameOver() {
  $("h1").text("Game Over Press any key to start again");
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  level = 0;
  index = 0;
  playSound("wrong");
};
