$(document).ready(function () {
  var turnedOn = false;
  var startedGame = false;
  var strictMode = false;
  var points = 0;

  var sequence = [];
  var whoIsTurn;
  var playerPosition;

  $('#on-off').click(function () {
    if (!turnedOn) {
      // Turn machine on
      turnedOn = true;
      $('#switch #on-off #on-off-box').css('float', 'right');

      $('#switch-row #count #display').text('- -');
      $('#switch-row #count #display').css('color', 'white');
    } else {
      // Turn machine off
      turnedOn = false;
      startedGame = false;
      strictMode = false;
      points = 0;

      $('#switch #on-off #on-off-box').css('float', 'left');
      $('#switch-row #count #display').css('color', 'rgb(88, 11, 29)');
      $('#switch-row #strict #led').css('background-color', 'rgb(52, 6, 6)');
    }
  });

  $('#switch-row #start .button').click(function () {
    if (turnedOn) {
      if (!startedGame) {
        startedGame = true;
        computerTurn(true);
      } else {
        startedGame = false;
      }
    }
  });

  $('#switch-row #strict .button').click(function () {
    if (turnedOn && !strictMode) {
      $('#switch-row #strict #led').css('background-color', 'rgb(191, 41, 47)');
      strictMode = true;
    } else if (turnedOn && strictMode) {
      $('#switch-row #strict #led').css('background-color', 'rgb(52, 6, 6)');
      strictMode = false;
    }
  });

  $('.color').click(function () {
    if (whoIsTurn == 'player') {
      var colorClicked = $(this).attr('id');
      blink(colorClicked);
      playSound(colorClicked);

      if (sequence[playerPosition] == colorClicked) {
        // Right color clicked
        playerPosition++;
      } else {
        // Wrong color clicked
        $('#switch-row #count #display').text('!!');
        playSound('wrong');

        if (strictMode) {
          setTimeout(function () {
            computerTurn(true);
          }, 200);
          sequence = [];
          points = 0;
        } else {
          setTimeout(function () {
            computerTurn(false);
          }, 200);
        }
      }

      if (playerPosition == sequence.length) {
        // Last one
        computerTurn(true);
      }
    }
  });

  function computerTurn(addNew) {
    if (points == 20) {
      $('h1').css('color', 'rgb(104, 150, 43)');
      $('h1').text('You won');
      $('#switch-row #count #display').text('- -');
      startedGame = false;
      points = 0;
      sequence = [];

      setTimeout(function () {
        $('h1').css('color', 'black');
        $('h1').text('Simon');
      }, 1000);

      return true;
    }

    whoIsTurn = 'computer';
    $('.color').css('cursor', 'initial');

    if (addNew) {
      var newColor = ['green', 'red', 'yellow', 'blue'][Math.floor(Math.random() * 4)];
      sequence.push(newColor);
      points++;
    }

    if (points < 10) {
      $('#switch-row #count #display').text('0' + points);
    } else {
      $('#switch-row #count #display').text(points);
    }

    var i = 0;
    timer = setInterval(function () {
      var color = sequence[i];
      blink(color);
      playSound(color);

      if (i == (sequence.length - 1)) {
        // Last item of list
        whoIsTurn = 'player';
        $('.color').css('cursor', 'pointer');
        clearInterval(timer);
        playerPosition = 0;
      }

      i++;
    }, 500);
  }

  function blink(color) {
    var normalColor;
    var blinkColor;

    switch (color) {
      case 'green':
        normalColor = 'rgb(6, 147, 24)';
        blinkColor = 'rgb(85, 196, 100)';
        break;
      case 'red':
        normalColor = 'rgb(172, 39, 19)';
        blinkColor = 'rgb(182, 81, 66)';
        break;
      case 'yellow':
        normalColor = 'rgb(219, 223, 31)';
        blinkColor = 'rgb(219, 222, 88)';
        break;
      case 'blue':
        normalColor = 'rgb(47, 92, 140)';
        blinkColor = 'rgb(81, 125, 172)';
        break;
    }

    $('#' + color).css('background-color', blinkColor);
    setTimeout(function () {
      $('#' + color).css('background-color', normalColor);
    }, 400);
  }

  function playSound(color) {
    var sound;
    switch (color) {
      case 'green':
        sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
        break;
      case 'red':
        sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
        break;
      case 'yellow':
        sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
        break;
      case 'blue':
        sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
        break;
      case 'wrong':
        sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
        sound.play();
        sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
        sound.play();
        sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
        sound.play();
        sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
        sound.play();
        return true;
    }
    sound.play();
  }

});
