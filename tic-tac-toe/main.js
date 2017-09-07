$(document).ready(function () {
  var playerSymbol;
  var computerSymbol;

  var grid = {
    'a': false,
    'b': false,
    'c': false,
    'd': false,
    'e': false,
    'f': false,
    'g': false,
    'h': false,
    'i': false,
  };
  // var available = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

  $('.choose-symbol').click(function () {
    playerSymbol = $(this).text();

    // Choose computerSymbol
    switch (playerSymbol) {
      case 'X':
        computerSymbol = 'O';
        break;
      case 'O':
        computerSymbol = 'X';
        break;
    }

    // Make #choose invisible
    $('#choose').css('visibility', 'hidden');
    $('#grid').css('visibility', 'visible');
  });

  // Hover effect on boxes
  $('.box').hover(function () {
    if (!grid[$(this).attr('id')]) {
      $(this).children('p').text(playerSymbol);
      $(this).children('p').css('color', 'rgba(255, 255, 255, 0.46)');
    }
  }, function () {
    if (!grid[$(this).attr('id')]) {
      $(this).children('p').text('');
      $(this).children('p').css('color', 'white');
    }
  });

  $('.box').click(function () {
    if (checkGame()) {
      // If not clicked yet
      if (!(grid[$(this).attr('id')])) {
        $(this).children('p').css('color', 'white');
        grid[$(this).attr('id')] = 'user';
        $(this).children('p').text(playerSymbol);
        if (checkGame()) {
          computerChoose();
        }
      }

      checkGame();
    }

  });

  function computerChoose() {
    // Create list with all available boxes
    var available = [];
    for (var [key, value] of Object.entries(grid)) {
      if (!value) {
        available.push(key);
      }
    }

    // Choose random box
    var random = Math.floor(Math.random() * (available.length - 1));
    var letter = available[random];
    grid[letter] = 'computer';
    $('#' + letter.toLowerCase() + ' p').text(computerSymbol);
  }

  function checkGame() {
    // Check whether someone has won
    var elements = ['user', 'computer'];
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (grid.a == element && grid.b == element && grid.c == element) {
        winner(element);
        return false;
      } else if (grid.d == element && grid.e == element && grid.f == element) {
        winner(element);
        return false;
      } else if (grid.g == element && grid.h == element && grid.i == element) {
        winner(element);
        return false;
      } else if (grid.a == element && grid.d == element && grid.g == element) {
        winner(element);
        return false;
      } else if (grid.b == element && grid.e == element && grid.h == element) {
        winner(element);
        return false;
      } else if (grid.c == element && grid.f == element && grid.i == element) {
        winner(element);
        return false;
      } else if (grid.a == element && grid.e == element && grid.i == element) {
        winner(element);
        return false;
      } else if (grid.c == element && grid.e == element && grid.g == element) {
        winner(element);
        return false;
      }
    }

    // Create list with all available boxes and check whether some boxes are still available
    var available = [];
    for (var [key, value] of Object.entries(grid)) {
      if (!value) {
        available.push(key);
      }
    }
    if (available.length == 0) {
      winner('tie');
      return false;
    }

    return true;
  }

  function winner(element) {
    var message;
    if (element == 'user') {
      message = 'You are the winner';
    } else if (element == 'computer') {
      message = 'I\'m sorry';
    } else if (element == 'tie') {
      message = 'Tie';
    }

    $('#message').text(message);
    $('#message').css('top', '47%');

    // Reload site after 3 seconds
    setTimeout(function () {
      location.reload();
    }, 3000);
  }
});
