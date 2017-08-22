var backgroundColors = ['#C2185B', '#512DA8', '#303F9F', '#1976D2', '#00796B', '#689F38', '#FBC02D', '#FF5722'];

$(document).ready(function () {
  $('button').on('click', function () {
    $.ajax({
      beforeSend: function (request) {
        request.setRequestHeader('X-Mashape-Key', 'NTDMjvomLImshpwtPMo4t9pBgapxp12iWSgjsnfwGIKoUK1O8G');
        request.setRequestHeader('Accept', 'application/json');
      },
      type: 'GET',
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=10',
    })

    .done(function (data) {
      $('#quote-text').text(data[0].quote);
      $('#quote-author').text('- ' + data[0].author);

      var backgroundColor = backgroundColors[Math.floor(Math.random() * (backgroundColors.length - 0 + 1))];
      $('body').css('background-color', backgroundColor);
    });
  });
});
