$(document).ready(function () {
  var users = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'RobotCaleb', 'noobs2ninjas'];
  var userInfo = getUserInfo(users);

  // Add menubar
  for (var i = 0; i < users.length; i++) {
    $('ul').append('<li><a>' + users[i] + '</a></li>')
  }

  // Add default content
  showUser('freecodecamp');
  $('main').show();

  // If user clicks on button
  $('li').click(function () {
    showUser($(this).text());
  });

  function getUserInfo(users) {
    var userInfo = {};

    for (var i = 0; i < users.length; i++) {
      var username = users[i];
      userInfo[username] = {};

      // Get data from /users api
      $.ajax({
        url: 'https://wind-bow.glitch.me/twitch-api/users/' + username,
        async: false,
      }).done(function (data) {
        userInfo[username].name = data.display_name;
        userInfo[username].bio = data.bio;
        userInfo[username].logo = data.logo;
      });

      // Get data from /streams api
      $.ajax({
        url: 'https://wind-bow.glitch.me/twitch-api/streams/' + username,
      }).done(function (data) {
        if (data.stream === null) {
          userInfo[username].online = false;
        } else {
          userInfo[username].online = data.stream.game;
        }
      });
    }

    return userInfo;
  }

  function showUser(username) {
    $('#info h1').html(userInfo[username].name);
    $('#info p').html(userInfo[username].bio);

    if (userInfo[username].online) {
      $('#info button').html(userInfo[username].online);
      $('#info button').attr('id', 'online');
    } else {
      $('#info button').html('Offline');
      $('#info button').attr('id', 'offline');
    }

    $('#info img').attr('src', userInfo[username].logo);
    $('#info a').attr('href', 'https://www.twitch.tv/' + username);
  }
});
