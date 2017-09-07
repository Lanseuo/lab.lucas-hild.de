// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

$(document).ready(function () {
  function notifyMe() {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === 'granted') {}

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {});
    }
  }

  notifyMe();

  var timerRuns = false;
  var startLengthInSeconds;
  var timer;

  // Progress Bar
  var bar = new ProgressBar.SemiCircle(progressbar, {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null,
  });
  bar.animate(1.0);

  // Increase number
  $('.choose-plus').click(function () {
    $(this).siblings('.choose-number').text(parseInt($(this).siblings('.choose-number').text()) + 1);
  });

  // Decrease number
  $('.choose-minus').click(function () {
    $(this).siblings('.choose-number').text(parseInt($(this).siblings('.choose-number').text()) - 1);
  });

  // Start
  $('.choose-start').click(function () {
    // If old timer still runs
    if (timerRuns) {
      timerRuns = false;
      clearInterval(timer);
    }

    var length = parseInt($(this).siblings('.choose-time').children('.choose-number').text());
    var lengthInSeconds = length * 60;
    startLengthInSeconds = lengthInSeconds;
    startTimer(lengthInSeconds, lengthInSeconds);
  });

  // Pause and Play
  $('#progress').click(function () {
    if (timerRuns) {
      timerRuns = false;
      clearInterval(timer);
    } else {
      length = fullToSec($('#time').text());
      startTimer(length, startLengthInSeconds);
    }
  });

  function startTimer(lengthInSeconds, startLengthInSeconds) {
    timerRuns = true;

    timer = setInterval(function () {
      if (timerRuns) {
        if (lengthInSeconds > 0) {
          $('#time').text(secToFull(lengthInSeconds));
          lengthInSeconds--;
          bar.animate(lengthInSeconds / startLengthInSeconds);
        } else {
          $('#time').text('0:00');
          timerRuns = false;
          clearInterval(timer);

          var sound = new Audio('https://www.soundjay.com/phone/telephone-ring-03a.mp3');
          sound.play();
          var notification = new Notification('The time is over!');
        }
      }
    }, 1000);
  }

  function secToFull(num) {
    // Seconds to ?:??
    var min = Math.floor(num / 60);
    var seconds = num % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return min + ':' + seconds;
  }

  function fullToSec(num) {
    // ?:?? to seconds
    num = num.split(':');
    var seconds = parseInt(num[1]) + parseInt(num[0]) * 60;
    return seconds;
  }
});
